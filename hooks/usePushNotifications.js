import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform, Alert } from "react-native";

const usePushNotifications = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("undetermined");

  const requestUserPermission = async () => {
    // Android 13+ requires explicit permission check
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionStatus("denied");
        return false;
      }
    }

    // iOS / General Permission Check via Firebase
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      setPermissionStatus("granted");
      return true;
    } else {
      setPermissionStatus("denied");
      return false;
    }
  };

  const getFCMToken = async () => {
    try {
      const hasPermission = await requestUserPermission();

      if (!hasPermission) {
        console.log("Permission denied");
        return null;
      }

      const token = await messaging().getToken();

      if (token) {
        console.log("New FCM Token:", token);
        setFcmToken(token);
        return token;
      }
    } catch (error) {
      console.error("Failed to get FCM token:", error);
      return null;
    }
  };

  // Listener for Token Refresh
  // (FCM tokens can rotate; this ensures we always have the freshest one)
  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh((token) => {
      console.log("Refreshed FCM Token:", token);
      setFcmToken(token);
      // OPTIONAL: Immediately send the new token to your backend here
    });

    return unsubscribe;
  }, []);

  const registerToken = async (userId) => {
    const token = await getFCMToken();
    if (!token) return;

    try {
      await fetch(
        `${process.env.EXPO_PUBLIC_NOTIFICATIONS_BASE_URL}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            platform: "mobile",
            pushToken: token,
          }),
        }
      );

      console.log("Device subscribed for notifications");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const sendNotification = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_NOTIFICATIONS_BASE_URL}/trigger-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Notification sucessfully sent:", responseData);
        return `Success: ${responseData.message}`;
      } else {
        console.error("Dispatch failed:", responseData.error);
        return "Dispatch failed:", responseData.error;
      }
    } catch (error) {
      console.error("Network error:", error);
      return "Error: failed to send notification";
    }
  };

  return {
    fcmToken,
    getFCMToken,
    registerToken,
    sendNotification,
    permissionStatus,
  };
};

export default usePushNotifications;
