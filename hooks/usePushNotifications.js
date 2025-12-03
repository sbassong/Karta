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

  return { fcmToken, getFCMToken, permissionStatus };
};

export default usePushNotifications;
