import {Platform} from "react-native";
import firestore from "@react-native-firebase/firestore";

interface SendNotificationProps {
  sendPushNotify: any;
  title: string;
  body: string;
  token?: string; //approvers id
  onSuccessCallback: any;
  onErrorCallback: any;
}

export const sendNotification = async ({
  sendPushNotify,
  title,
  body,
  token, //approvers id
  onSuccessCallback,
  onErrorCallback,
}: SendNotificationProps) => {
  const snapshot = await firestore()
    .collection("Users")
    .where("role", "==", "Admin")
    .get();
  const deviceTokenArray: string[] = [];
  if (!snapshot.empty) {
    snapshot.forEach(userDoc => {
      const deviceToken = userDoc.data().deviceToken;
      deviceTokenArray.push(deviceToken);
    });
  } else {
    console.log("No documents found in the Users collection.");
  }

  const message = {
    registration_ids: token ? [token] : deviceTokenArray, //For notification to whole users
    notification: {
      title: title || "Leave Request",
      body:
        body ||
        (Platform.OS === "ios"
          ? "Send a message from iOS"
          : "Send a message from Android"),
      vibrate: 1,
      sound: 1,
      image: "https://www.aihr.com/wp-content/uploads/types-of-leave-cover.png",
      priority: "high",
      show_in_foreground: true,
      content_available: true,
    },
    data: {
      title: "data_title",
      body: "data_body",
      extra: "data_extra",
    },
  };

  sendPushNotify(
    JSON.stringify(message),
    // {
    //   onSuccess: response => {
    //     console.log(response);
    //     onSuccessCallback && onSuccessCallback(response);
    //   },
    //   onError: error => {
    //     console.log(error);
    //     onErrorCallback && onErrorCallback(error);
    //   },
    // }
    response => onSuccessCallback && onSuccessCallback(response),
    error => onErrorCallback && onErrorCallback(error),
  );
};
