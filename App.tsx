import React, {useCallback, useEffect} from "react";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

import AuthProvider from "./src/context/provider";
import OCEmployee from "./src/OCEmployee";
import {
  googleApiScopes,
  googleIOSClientId,
  googleWebClientId,
} from "./src/configs/googleApiConfig";
import {NotificationType} from "./src/constants/types/notification";
import useChat from "./src/hooks/useChat";
import useChatBadge from "./src/hooks/useChatBadge/idnex";
import {showToast} from "./src/utils/showToast";
import useAuthenticate from "./src/hooks/useAuthenticate";

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});

const requestUserPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus) {
    console.log("permission status:", authorizationStatus);
  }
};

const requestAndroidPermissions = async () => {
  if (Platform.OS === "android") {
    try {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        result[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] !==
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.warn("Notification permission denied");
      }

      if (
        result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !==
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.warn("Location permission denied");
      }
    } catch (error) {
      showToast({type: "error", text1: "Error", text2: error.message});
    }
  }
};

GoogleSignin.configure({
  scopes: googleApiScopes,
  forceCodeForRefreshToken: true,
  accountName: "",
  iosClientId: googleIOSClientId,
  webClientId: googleWebClientId,
  offlineAccess: false,
});

const App = () => {
  const {setChatNotification} = useChatBadge();
  const user = useAuthenticate();

  if (Platform.OS === "android") {
    requestAndroidPermissions();
  }

  useEffect(() => {
    const setUpCloudMessaging = async () => {
      requestUserPermission();
    };
    setUpCloudMessaging();
  }, []);

  const handleNotification = useCallback(notification => {
    switch (notification?.data?.title) {
      case NotificationType.CHAT:
        break;
      default:
        Alert.alert("A new FCM message arrived!", JSON.stringify(notification));
        break;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setChatNotification(true);

      handleNotification(remoteMessage);
    });

    return unsubscribe;
  }, [handleNotification, setChatNotification]);

  return (
    <AuthProvider>
      <OCEmployee />
      <Toast />
    </AuthProvider>
  );
};

export default App;
