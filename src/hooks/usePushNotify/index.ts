import {requestPushNotify} from "./request";

const usePushNotify = () => {
  const sendPushNotify = async (
    body,
    onSuccess = _ => {},
    onFailure = _ => {},
  ) => {
    try {
      const response = await requestPushNotify(body);
      onSuccess?.(response);
    } catch (err) {
      onFailure?.(err);
    }
  };

  return {sendPushNotify};
};

export default usePushNotify;
