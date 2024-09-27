import { collection, getDocs, query, where } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import { Lesson } from "types";
import useUserViewModel from "./UserViewModel";
import Lessson from "types/lesson";

const useCharacterViewModel = () => {
  const [loading, setLoading] = useState(true);
  const currentUser = useAtomValue(userAtom);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { user } = useUserViewModel();

  useEffect(() => {
    lessons?.length === 0 &&
      (async () => {
        try {
          setLoading(true);
          const q = query(
            collection(db, "lessons"),
            where("type", "==", "character")
          );
          const querySnapshot = await getDocs(q);
          const _lessons = querySnapshot.docs.map((doc) =>
            doc.data()
          ) as Lessson[];
          setLessons(
            _lessons.sort((a: any, b: any) => a.title.localeCompare(b.title))
          );
        } catch (error) {
          console.error("Error lessons:", error);
          return error;
        } finally {
          setLoading(false);
        }
      })();
  }, [currentUser?.uid, lessons?.length]);

  const checkIfLessonCompleted = useCallback(
    (lessonId: string) => {
      const lessonsTaken = user?.lessonsTaken || [];
      return lessonsTaken.some((lesson) => lesson.lessonId === lessonId);
    },
    [user?.lessonsTaken]
  );

  return {
    lessons,
    loading,
    checkIfLessonCompleted
  };
};

export default useCharacterViewModel;
