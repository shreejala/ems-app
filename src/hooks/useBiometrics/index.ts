import {useEffect, useState} from "react";
import * as Keychain from "react-native-keychain";
import {showToast} from "../../utils/showToast";

const useBiometrics = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [bioEmail, setBioEmail] = useState("");
  const [bioPassword, setBioPassword] = useState("");
  useEffect(() => {
    const getBiometric = async () => {
      try {
        const bioCreds = await Keychain.getGenericPassword();
        if (bioCreds) {
          setBiometricEnabled(true);
          setBioEmail(bioCreds.username);
          setBioPassword(bioCreds.password);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getBiometric();
  }, []);

  const removeBiometric = async () => {
    try {
      await Keychain.resetGenericPassword();
      setBiometricEnabled(false);
      setBioEmail("");
      setBioPassword("");
    } catch (e) {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Failed to remove fingerprint",
      });
    }
  };

  return {biometricEnabled, bioEmail, bioPassword, removeBiometric};
};

export default useBiometrics;
