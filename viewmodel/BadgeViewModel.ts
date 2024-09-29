import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import { Badge } from "types";

const useBadgeViewModel = () => {
  const currentUser = useAtomValue(userAtom);
  const userId = currentUser?.uid as string;
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadgeIds, setUserBadgeIds] = useState<string[]>([]);

  async function giveBadgeToUser(lessonId: string) {
    const userRef = doc(db, "users", userId);
    const lessonRef = doc(db, "lessons", lessonId);

    // Fetch lesson details
    const lessonDoc = await getDoc(lessonRef);

    if (lessonDoc.exists()) {
      const lessonData = lessonDoc.data();
      // Check if the lesson has a badge
      if (lessonData?.badgeId) {
        const badgeId = lessonData.badgeId;

        // Fetch user data to check if they already have the badge
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        if (!userData?.badges?.includes(badgeId)) {
          // Award the badge (add badgeId to the user's badges array)
          await updateDoc(userRef, {
            badges: arrayUnion(badgeId)
          });

          console.log(`Badge ${badgeId} awarded for completing ${lessonId}!`);
        }
      }
    } else {
      console.log("Lesson not found!");
    }
  }

  async function fetchUserBadges() {
    setLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const badges = userData.badges || [];
        setUserBadgeIds(badges);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBadges() {
    setLoading(true);
    try {
      const badgeRef = collection(db, "badges");
      const q = query(badgeRef);
      const querySnapshot = await getDocs(q);
      const badges = querySnapshot.docs.map((doc) => doc.data());
      setBadges(badges?.sort((a, b) => a?.pos - b?.pos)?.reverse() as Badge[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    giveBadgeToUser,
    userBadgeIds,
    fetchUserBadges,
    fetchBadges,
    badges,
    loading
  };
};

export default useBadgeViewModel;
