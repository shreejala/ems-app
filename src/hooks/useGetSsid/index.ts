import {useEffect, useState} from "react";
import WifiManager from "react-native-wifi-reborn";

const useGetSsid = () => {
  const [wifiSSID, setWifiSSID] = useState("");

  useEffect(() => {
    const getWifiSSID = async () => {
      try {
        const ssid = await WifiManager.getCurrentWifiSSID();
        setWifiSSID(ssid);
      } catch (error) {
        console.error("Error getting Wi-Fi SSID:", error);
      }
    };

    getWifiSSID();

    // Optionally, you can listen for Wi-Fi changes and update the SSID dynamically
  }, []);

  return {wifiSSID};
};

export default useGetSsid;
