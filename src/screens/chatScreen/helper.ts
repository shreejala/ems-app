import ImagePicker from "react-native-image-crop-picker";

import {UserConversation} from "../../constants/types";
import {NotificationType} from "../../constants/types/notification";

const standardImageSize = 5;
const standardImageSizeBit = standardImageSize * 1000000;

export const getPushNotifiChatMsg = (payload: {
  fcmTokens: Array<string> | undefined;
  senderName: string;
  chatMessage: string;
  chatInfo?: UserConversation | null;
}) => {
  const {fcmTokens, senderName, chatMessage, chatInfo} = payload;

  const body = `${senderName || ""}: ${
    chatMessage !== "" ? chatMessage : "Sent a photo."
  }`;

  const message = {
    registration_ids: fcmTokens || [],
    notification: {
      title: "OC Employee",
      body,
      vibrate: 1,
      sound: 1,
      priority: "high",
      show_in_foreground: true,
      content_available: true,
    },
    data: {
      title: NotificationType.CHAT,
      body: chatInfo ? JSON.stringify(chatInfo) : "",
      // extra: "data_extra",
    },
  };
  return JSON.stringify(message);
};

export const openFilePicker = async () => {
  return await ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false,
    // multiple: true,
  }).then(response => {
    if (response?.size > standardImageSizeBit) {
      throw new Error(`File must be less than ${standardImageSize} MB.`);
    } else {
      // return response?.map(img => img?.path);
      return response?.path;
    }
  });
};

export const openCamera = () => {
  return ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    return image.path;
  });
};
