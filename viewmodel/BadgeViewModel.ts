import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";

const useBadgeViewModel = () => {
  const currentUser = useAtomValue(userAtom);
  const userId = currentUser?.uid as string;
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([]);

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

  async function displayUserBadges() {
    setLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const badges = userData.badges || [];

        const result = [];
        // Display badges by fetching from badges collection
        for (const badgeId of badges) {
          const badgeRef = doc(db, "badges", badgeId);
          const badgeDoc = await getDoc(badgeRef);

          if (badgeDoc.exists()) {
            const badgeData = badgeDoc.data();
            result.push(badgeData);
            console.log(
              `Badge: ${badgeData.name}, Description: ${badgeData.description}`
            );
          }
        }
        console.log(result);
        setBadges(result as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { giveBadgeToUser, displayUserBadges, badges, loading };
};

export default useBadgeViewModel;
