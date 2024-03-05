import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";

const useChatBadge = () => {
  const [hasChatNotification, setHasChatNotification] = useState(false);

  const setChatNotification = async (value: boolean) => {
    return await AsyncStorage.setItem(
      "hasChatNotification",
      JSON.stringify(value),
    );
  };

  useEffect(() => {
    const getChatNotification = async () => {
      const chatNotification = await AsyncStorage.getItem(
        "hasChatNotification",
      );
      setHasChatNotification(
        chatNotification ? JSON.parse(chatNotification) : false,
      );
    };

    getChatNotification();
  }, []);

  return {hasChatNotification, setChatNotification};
};

export default useChatBadge;
