import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import {Platform} from "react-native";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import {getErrorMessage} from "../../constants/helper";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
// import useProfile from "../../hooks/useProfile";
import {showToast} from "../../utils/showToast";
import {getUserRole} from "../../utils/getUserRole";

type signInHandlerType = {
  email: string;
  password: string;
  biometricEnabled?: boolean;
};

const updateDeviceToken = async (uid: string) => {
  let deviceToken = "";
  Platform.OS === "android"
    ? (deviceToken = await messaging().getToken())
    : (deviceToken = "IOS");

  firestore().collection("Users").doc(uid).update({
    deviceToken,
  });
};

export const signInHandler = async ({
  email,
  password,
  biometricEnabled,
}: signInHandlerType) => {
  if (!biometricEnabled) {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available && biometryType === BiometryTypes.Biometrics) {
      rnBiometrics
        .simplePrompt({
          promptMessage: "Enable fingerprint for this account",
          cancelButtonText: "Cancel",
        })
        .then(async resultObject => {
          const {success} = resultObject;
          if (success) {
            await firebaseSignIn(email, password);
            await Keychain.setGenericPassword(email, password);
          } else {
            await firebaseSignIn(email, password);
          }
        });
    } else {
      await firebaseSignIn(email, password);
    }
  } else {
    await firebaseSignIn(email, password);
  }
};

export const firebaseSignIn = async (username: string, password: string) => {
  await auth()
    .signInWithEmailAndPassword(username, password)
    .then(async (res: any) => {
      showToast({
        type: "success",
        text1: "Login Successful",
      });
      await AsyncStorage.setItem("token", res?.user?._user?.uid ?? "");
      const role = await getUserRole(res?.user?._user?.uid);
      await AsyncStorage.setItem("role", role);
      updateDeviceToken(res?.user?._user?.uid);
      // useProfile();
    })
    .catch(error => {
      const errorMessage = getErrorMessage(error.code);
      showToast({
        type: "error",
        text1: "Login Failed",
        text2: errorMessage?.text2,
      });
    });
};
