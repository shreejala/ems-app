import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("token");
        setToken(data);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);
  return token;
};
