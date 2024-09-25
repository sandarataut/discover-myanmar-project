import { useFocusEffect } from "expo-router";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebaseConfig";

interface ILeaderboard {
  name: string;
  totalScore: number;
  userId: string;
}
const useLeaderboardViewModel = () => {
  const [loading, setLoading] = useState(true);
  const [leadboard, setLeaderboard] = useState<ILeaderboard[]>([]);

  const fetchLeadboard = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "leaderboard"), limit(10));
      const querySnapshot = await getDocs(q);
      let temp: any = [];
      querySnapshot.forEach((doc) => {
        temp = [...temp, doc.data()];
      });
      setLeaderboard(
        temp.sort(
          (a: ILeaderboard, b: ILeaderboard) => b.totalScore - a.totalScore
        )
      );
    } catch (error) {
      console.error("Error leaderboard:", error);
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLeadboard();
    }, [fetchLeadboard])
  );

  useEffect(() => {
    setLoading(true);
    fetchLeadboard().finally(() => setLoading(false));
  }, [fetchLeadboard]);

  return {
    leadboard,
    loading,
    refreshUser: fetchLeadboard
  };
};

export default useLeaderboardViewModel;
