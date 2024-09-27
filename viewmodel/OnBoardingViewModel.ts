import { router } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";

interface IQuestion {
  id: string;
  title: string;
  options: string[];
  value?: string;
}
const getUserPreferences: IQuestion[] = [
  {
    id: "what_would_you_like_to_learn?",
    title: "What would you like to learn?",
    options: [
      "Myanmar Language",
      "Geographic Exploration",
      "Cukural Immersion",
      "Cuinary Experience"
    ]
  },
  {
    id: "how_did_you_hear_about_us?",
    title: "How did you hear about us?",
    options: [
      "App Store",
      "Social Media",
      "Friends / Family",
      "Google Search",
      "Others"
    ]
  },
  {
    id: "why_are_you_downloading_this_app?",
    title: "Why are you downloading this app?",
    options: [
      "Prepare for travel",
      "Just for fun",
      "Connect with people",
      "Support my education",
      "Others"
    ]
  }
];

const useOnBoardingViewModel = () => {
  const user = useAtomValue(userAtom);

  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [answer, setAnswer] = useAtom(answersAtom);

  const [loading, setLoading] = useState(false);

  const question = getUserPreferences[currentPosition];

  useEffect(() => {
    if (answer) {
      setSelectedValue(answer?.[question?.id]);
    }
  }, [answer, question?.id]);

  const updateAnswer = useCallback(
    (key: string, value: string) => {
      setSelectedValue(value);
      setAnswer((pre) => ({ ...pre, [key]: value }));
    },
    [setAnswer]
  );

  const saveUserPreferences = useCallback(async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "users", user?.uid as string), {
        onboarding: answer
      });
    } catch (error) {
      console.error("Error register user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [answer, user?.uid]);

  const onPressContinue = useCallback(() => {
    if (currentPosition < getUserPreferences?.length - 1) {
      setCurrentPosition((pre) => pre + 1);
    } else {
      saveUserPreferences().then(() =>
        router.replace("/request-notitication-permission")
      );
    }
  }, [currentPosition, saveUserPreferences]);

  return {
    currentPosition,
    selectedValue,
    setCurrentPosition,
    answer,
    question,
    updateAnswer,
    questionLength: getUserPreferences.length,
    onPressContinue,
    loading
  };
};

export default useOnBoardingViewModel;

interface IAnswer {
  [key: string]: string;
}

const answersAtom = atom<IAnswer>({});
