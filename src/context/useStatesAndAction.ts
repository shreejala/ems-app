import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";
import {showToast} from "../utils/showToast";

const useStatesAndActions = () => {
  const [token, setToken] = useState<string | null>(null);

  const signOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        setToken(userToken);
      } catch (error) {
        showToast({
          type: "error",
          text1: "User not logged in",
        });
      }
    };
    isUserLoggedIn();
  }, []);

  const state = {
    token,
  };

  const actions = {
    setToken,
    signOut,
  };

  return [state, actions];
};

export default useStatesAndActions;
