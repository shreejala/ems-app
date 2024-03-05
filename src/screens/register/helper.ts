import auth from "@react-native-firebase/auth";
import {Platform} from "react-native";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getErrorMessage} from "../../constants/helper";
import {showToast} from "../../utils/showToast";
const checkUsernameExists = async (username: string): Promise<boolean> => {
  const snapshot = await firestore()
    .collection("Users")
    .where("username", "==", username)
    .get();

  return !snapshot.empty;
};

export const handleSignUp = async (data: any) => {
  const {
    email,
    password,
    username,
    location,
    name,
    setError,
    setIsSignUpLoading,
  } = data;
  setIsSignUpLoading(true);
  let deviceToken = "";

  const usernameExists = await checkUsernameExists(username);
  if (usernameExists) {
    setError("username", {
      type: "manual",
      message: "Username already exists",
    });
    setIsSignUpLoading(false);

    return;
  }
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res: any) => {
      Platform.OS === "android"
        ? (deviceToken = await messaging().getToken())
        : (deviceToken = "IOS");
      //store in firestore
      firestore()
        .collection("Users")
        .doc(res?.user?._user?.uid)
        .set({
          uid: res?.user?._user?.uid,
          email,
          username,
          name,
          deviceToken,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          role: "Employee",
        })
        .then(async () => {
          await AsyncStorage.setItem("token", res?.user?._user?.uid ?? "");

          showToast({
            type: "success",
            text1: "Login Successful",
          });
          setIsSignUpLoading(false);
        });
    })
    .catch(error => {
      const errorMessage = getErrorMessage(error.code);

      showToast({
        type: "error",
        text1: "Sign Up Failed",
        text2: errorMessage?.text2,
      });
    });
};
