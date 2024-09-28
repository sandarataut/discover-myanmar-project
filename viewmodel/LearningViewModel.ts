import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import pointInPolygon from "point-in-polygon";
import { useCallback, useState } from "react";
import { InteractionManager } from "react-native";
import { Point } from "rn-perfect-sketch-canvas";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import diff from "utils/diff";
import useUserViewModel from "./UserViewModel";
import useBadgeViewModel from "./BadgeViewModel";

const useLearningViewModel = () => {
  const currentUser = useAtomValue(userAtom);
  const userId = currentUser?.uid as string;
  const name = currentUser?.displayName as string;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number>(0);

  const { user, loading: userLoading, refreshUser } = useUserViewModel();
  const { giveBadgeToUser } = useBadgeViewModel();

  const updateLeaderboard = useCallback(
    async (userId: string, totalScore: number) => {
      const leaderboardRef = doc(db, "leaderboard", userId);

      try {
        const leaderboardSnap = await getDoc(leaderboardRef);

        if (leaderboardSnap.exists()) {
          await updateDoc(leaderboardRef, {
            userId: userId,
            totalScore: totalScore
          });
        } else {
          await setDoc(leaderboardRef, {
            userId: userId,
            totalScore: totalScore,
            name
          });
        }

        console.log(`Leaderboard updated for user ${userId}.`);
      } catch (error) {
        console.error("Error updating leaderboard:", error);
      }
    },
    [name]
  );

  const updateUserLesson = useCallback(
    async (userId: string, lessonId: string, score: number) => {
      const userRef = doc(db, "users", userId);
      try {
        if (user) {
          const userData = user;
          const lessonsTaken = userData?.lessonsTaken || [];
          const totalScore = userData?.totalScore || 0;

          const isExistLession = lessonsTaken?.some(
            (lesson: any) => lesson?.lessonId === lessonId
          );
          if (!isExistLession) {
            // Add new lesson to lessonsTaken array
            const updatedLessonsTaken = [
              ...lessonsTaken,
              {
                lessonId,
                score,
                dateTaken: new Date().toISOString()
              }
            ];

            // Update total score
            const updatedTotalScore = totalScore + score;

            // Write back updated data
            await updateDoc(userRef, {
              lessonsTaken: updatedLessonsTaken,
              totalScore: updatedTotalScore
            });

            // Update the leaderboard directly
            await updateLeaderboard(userId, updatedTotalScore);
          } else {
            throw "This lesson is already taken.";
          }
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error updating user lessons:", error);
      }
    },
    [updateLeaderboard, user]
  );

  const saveUserScore = useCallback(
    (templatePoint: Point[][], userPoint: Point[][], lessonId: string) => {
      const getPoints = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const userDrawingPoints = diff(templatePoint, userPoint);
            let inCount = 0;
            let outCount = 0;
            userDrawingPoints.forEach((point) => {
              const isIn = pointInPolygon(point, templatePoint.flat());
              if (isIn) {
                ++inCount;
              } else {
                ++outCount;
              }
            });
            resolve({ inCount, outCount });
          }, 100);
        });
      };
      setLoading(true);
      return InteractionManager.runAfterInteractions(async () => {
        const point = await getPoints();
        // @ts-ignore
        const inCount = point?.inCount;
        // @ts-ignore
        const outCount = point?.outCount;
        // @ts-ignore
        const totalCount = inCount + outCount;

        const insideRatio = inCount / totalCount;
        const outsideRatio = (outCount / totalCount) * 1;
        const score = 100 * insideRatio - outsideRatio;
        setScore(score);
        try {
          await updateUserLesson(userId, lessonId, score);
          await refreshUser();
          giveBadgeToUser(lessonId);
        } catch (e: any) {
          setErrorMessage(e);
        }
        setLoading(false);
      });
    },
    [giveBadgeToUser, refreshUser, updateUserLesson, userId]
  );

  const checkIfLessonCompleted = useCallback(
    (lessonId: string) => {
      const lessonsTaken = user?.lessonsTaken || [];
      return lessonsTaken.some((lesson) => lesson.lessonId === lessonId);
    },
    [user?.lessonsTaken]
  );

  return {
    score,
    user,
    updateUserLesson,
    saveUserScore,
    checkIfLessonCompleted,
    loading,
    userLoading,
    errorMessage
  };
};

export default useLearningViewModel;
