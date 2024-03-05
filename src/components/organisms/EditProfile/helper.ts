import firestore from "@react-native-firebase/firestore";
import {AppTabRoutes} from "../../../routes/types";
import {SetStateAction} from "react";
import {UseFormSetValue} from "react-hook-form";
import {ProfileContentPayload} from "../../../configs/types";
import {showToast} from "../../../utils/showToast";

export const handleProfileDataPopulate = (
  description: string,
  setValue: UseFormSetValue<ProfileContentPayload>,
  skills: string[],
  setSkills: React.Dispatch<React.SetStateAction<string[]>>,
  experience: string[],
  setExperience: React.Dispatch<React.SetStateAction<string[]>>,
  projects: string[],
  setProjects: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  description && setValue("description", description);
  skills && setSkills(skills);
  experience && setExperience(experience);
  projects && setProjects(projects);
};

export const handleAddContent = (
  currentData: string,
  setData: React.Dispatch<React.SetStateAction<string[]>>,
  setCurrentData: React.Dispatch<React.SetStateAction<string>>,
  scrollViewRef?: React.RefObject<any>,
) => {
  if (currentData.trim() !== "") {
    setData(prevData => [...prevData, currentData.trim()]);
    setCurrentData("");
    scrollViewRef?.current?.scrollToEnd({animated: true});
  }
};

export const handleProfileEditPress = async (
  uid?: string,
  description?: string,
  skills?: string[],
  experience?: string[],
  projects?: string[],
  setIsLoading?: React.Dispatch<SetStateAction<boolean>>,
  navigation?: any,
) => {
  try {
    setIsLoading && setIsLoading(true);
    await firestore().collection("Users").doc(uid).update({
      description: description,
      skills: skills,
      experience: experience,
      projectWorked: projects,
    });
    showToast({
      type: "success",
      text1: "Profile updated",
      text2: "Your profile has been updated",
    });
    navigation.navigate(AppTabRoutes.Profile);
    setIsLoading && setIsLoading(false);
  } catch (e) {
    showToast({
      type: "error",
      text1: "Something went wrong",
      text2: "Please try again",
    });
  }
};

export const handleFocus = (
  setIsFocused: React.Dispatch<SetStateAction<boolean>>,
  isFocused: boolean,
) => {
  setIsFocused(!isFocused);
};
