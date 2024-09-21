import { router } from "expo-router";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import { User } from "types";
const useProfileViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const currentUser = useAtomValue(userAtom);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", currentUser?.uid as string);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error user:", error);
      return error;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const saveProfileUpdates = useCallback(
    async (name: string, dob: string) => {
      try {
        setSavingProfile(true);
        await updateDoc(doc(db, "users", currentUser?.uid as string), {
          name,
          dob
        });
        updateProfile(auth.currentUser as any, {
          displayName: name
        });
        setSuccessMessage("successfully updated.");
        router.replace("/(profile)/update-profile-success");
      } catch (error: any) {
        console.error("Error updating user:", error);
        setErrorMessage(error?.message);
        throw error;
      } finally {
        setSavingProfile(false);
      }
    },
    [currentUser?.uid]
  );

  return {
    user,
    saveProfileUpdates,
    errorMessage,
    savingProfile,
    successMessage,
    loading: loading
  };
};

export default useProfileViewModel;
