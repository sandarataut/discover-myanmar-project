import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebaseConfig";
import userAtom from "stores/userAtom";

export interface INotification {
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const useNotificationViewModel = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  return {
    notifications,
    loading
  };
};
export default useNotificationViewModel;
