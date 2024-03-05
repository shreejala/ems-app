import ReactNativeBiometrics from "react-native-biometrics";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import {AppTabRoutes} from "../../../routes/types";
import {UseFormSetError, UseFormSetValue} from "react-hook-form";
import {ProfileDetailsPayload} from "../../../configs/types";
import {SetStateAction} from "react";
import {showToast} from "../../../utils/showToast";

export const removeFingerprintBiometric = async (
  removeBiometric: () => void,
) => {
  const rnBiometrics = new ReactNativeBiometrics();
  rnBiometrics
    .simplePrompt({
      promptMessage: "Confirm Fingerprint",
      cancelButtonText: "Dismiss",
    })
    .then(async resultObject => {
      const {success, error} = resultObject;
      if (success) {
        await removeBiometric();
        showToast({
          type: "success",
          text1: "Fingerprint removed",
          text2: "Your fingerprint has been removed",
        });
      } else if (error) {
        showToast({
          type: "error",
          text1: "Error",
          text2: "Failed to remove fingerprint",
        });
      }
    })
    .catch(error => {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Failed to remove fingerprint",
      });
    });
};

export const handleUsernameFocus = (
  isUsernameFocused: boolean,
  setIsUsernameFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRoleFocused: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsUsernameFocused(!isUsernameFocused);
  setIsRoleFocused(false);
};

export const handleRoleFocus = (
  isRoleFocused: boolean,
  setIsRoleFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUsernameFocused: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsRoleFocused(!isRoleFocused);
  setIsUsernameFocused(false);
};

export const handleImageOptionLists = (
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setImage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const list = [
    {
      title: "Upload Image from camera",
      onPress: async () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImage(image?.path);
        });

        setIsVisible(false);
      },
    },
    {
      title: "Upload Image from gallery",
      onPress: async () => {
        setIsVisible(false);

        setTimeout(() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            setImage(image?.path);
          });
        }, 1000);
      },
    },
    {title: "Cancel", onPress: () => setIsVisible(false)},
  ];
  return list;
};

const uploadToFirebase = async (image: any, uid: string) => {
  const imageRef = storage().ref(`profile_images/${uid}`);
  await imageRef.putFile(image);
  const downloadURL = await imageRef.getDownloadURL();
  return downloadURL;
};

const checkUsernameExists = async (
  username: string,
  currentUserId: string,
): Promise<boolean> => {
  const snapshot = await firestore()
    .collection("Users")
    .where("username", "==", username)
    .get();
  const filteredSnapshot = snapshot.docs.filter(
    doc => doc.id !== currentUserId,
  );
  return filteredSnapshot.length > 0;
};

export const handleEditProfileDetailsPress = async (
  uid: string,
  image: string,
  username: string,
  subtitle: string,
  tel: string,
  linkedIn: string,
  profileImage: string,
  navigation: any,
  setError: UseFormSetError<ProfileDetailsPayload>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
) => {
  if (username?.length > 0 && subtitle?.length > 0) {
    setLoading(true);
    const usernameExists = await checkUsernameExists(username, uid);
    if (usernameExists) {
      setError("username", {
        type: "manual",
        message: "Username already exists",
      });

      return;
    }
    const profileImageUrl =
      image && profileImage !== image && (await uploadToFirebase(image, uid));

    await firestore()
      .collection("Users")
      .doc(uid)
      .update({
        username,
        subtitle: subtitle,
        profileImage: profileImageUrl
          ? profileImageUrl
          : profileImage
            ? profileImage
            : "",
        tel,
        linkedIn: linkedIn ? linkedIn : "",
      });
    setLoading(false);
    navigation.navigate(AppTabRoutes.Profile);
    showToast({
      type: "success",
      text1: "Success",
      text2: "Your profile has been updated",
    });
  } else {
    showToast({
      type: "error",
      text1: "Error",
      text2: "Please fill all the fields",
    });
  }
};

export const handleFormPopulate = (
  username: string,
  subtitle: string,
  profileImage: string,
  tel: string,
  linkedIn: string,
  setValue: UseFormSetValue<ProfileDetailsPayload>,
  setImage: React.Dispatch<React.SetStateAction<string>>,
) => {
  username && setValue("username", username);
  subtitle && setValue("subtitle", subtitle);
  profileImage && setImage(profileImage);
  tel && setValue("tel", tel);
  linkedIn && setValue("linkedIn", linkedIn);
};
