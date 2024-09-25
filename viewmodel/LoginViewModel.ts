import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "services/firebaseConfig";
const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setErrorMessage("");
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (error: any) {
      console.error("Error login user:", error?.code);
      if (error?.code === "auth/invalid-credential") {
        setErrorMessage("The email and password are invalid.");
      } else {
        setErrorMessage(error?.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    errorMessage,
    loading
  };
};

export default useLoginViewModel;
