import dayjs from "dayjs";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "services/firebaseConfig";
const useRegisterViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const registerUser = async (
    name: string,
    dob: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user?.uid), {
        name,
        dob: dayjs(dob).toISOString(),
        email,
        created_at: dayjs().toISOString()
      });
      updateProfile(auth.currentUser as any, {
        displayName: name
      });
      router.replace({ pathname: "/register-success", params: { name } });
    } catch (error: any) {
      console.error("Error register user:", error);
      setErrorMessage(error?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    errorMessage,
    registerUser,
    loading
  };
};

export default useRegisterViewModel;
