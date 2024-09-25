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
import { Notification as INotification } from "types";

const useNotificationViewModel = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useAtomValue(userAtom);
  const userId = currentUser?.uid as string;

  const getPushToken = async () => {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId
      })
    ).data;

    return pushTokenString;
  };

  async function sendPushNotification(
    title: string,
    body: string,
    data = { route: "notification" }
  ) {
    const expoPushToken = await getPushToken();
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
  }

  async function schedulePushNotification(
    title: string,
    body: string,
    data = { route: "notification" }
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data
      },
      trigger: null
    });
  }

  async function addNotification(title: string, message: string) {
    try {
      const notificationsRef = collection(
        doc(db, "users", userId),
        "notifications"
      );

      await addDoc(notificationsRef, {
        title: title,
        message: message,
        created_at: new Date().toISOString(),
        read: false // initially unread
      });
      await schedulePushNotification(title, message);
    } catch (error) {
      console.log("Error in add notificaton", error);
    }
  }

  // Function to mark notification as read
  async function markNotificationAsRead(notificationId: string) {
    const notificationRef = doc(
      db,
      "users",
      userId,
      "notifications",
      notificationId
    );

    await updateDoc(notificationRef, {
      read: true
    });
  }

  // Function to retrieve unread notifications for a user
  const getUnreadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const notificationsRef = collection(
        doc(db, "users", userId),
        "notifications"
      );
      const q = query(notificationsRef, where("read", "==", false));

      const querySnapshot = await getDocs(q);
      const unreadNotifications = querySnapshot.docs.map((doc) => doc.data());
      setNotifications(
        (unreadNotifications as INotification[]).sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    getPushToken,
    sendPushNotification,
    schedulePushNotification,
    notifications,
    addNotification,
    markNotificationAsRead,
    getUnreadNotifications,
    loading
  };
};

export default useNotificationViewModel;

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}
