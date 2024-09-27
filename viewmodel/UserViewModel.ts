import { useFocusEffect } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import { User } from "types";

const useUserViewModel = () => {
  const [loading, setLoading] = useState(true);
  const currentUser = useAtomValue(userAtom);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const docRef = doc(db, "users", currentUser?.uid as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error user:", error);
    } finally {
    }
  }, [currentUser?.uid]);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  useEffect(() => {
    setLoading(true);
    fetchUser().finally(() => setLoading(false));
  }, [fetchUser]);

  return {
    user,
    loading,
    refreshUser: fetchUser
  };
};

export default useUserViewModel;
