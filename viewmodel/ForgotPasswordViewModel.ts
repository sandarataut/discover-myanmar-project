import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "services/firebaseConfig";
const useForgotPasswordViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const resetUserPassword = async (email: string) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("We have sent reset password link to your email.");
    } catch (error: any) {
      console.error("Error reset password user:", error);
      setErrorMessage(error?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    resetUserPassword,
    errorMessage,
    successMessage,
    loading
  };
};

export default useForgotPasswordViewModel;
