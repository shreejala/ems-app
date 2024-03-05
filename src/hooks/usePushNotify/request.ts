import {Config} from "react-native-config";

import axios from "../../configs/axios";
import endpoints from "../../constants/endpoints";

const {pushNotification} = endpoints;

export const requestPushNotify = async body => {
  const response = await axios.post(pushNotification, body, {
    headers: {
      Authorization: `key=${Config.FIREBASE_SERVER_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
