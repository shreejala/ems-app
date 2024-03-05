import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import useAuthenticate from "../useAuthenticate";

const useProfile = () => {
  const user = useAuthenticate();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [refetchProfileData, setRefetchProfileData] = useState(false);
  const [profileData, setProfileData] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >({});

  useEffect(() => {
    const userRef = firestore().collection("Users").doc(user?.uid);
    const unsubscribe = userRef.onSnapshot(
      snapshot => {
        if (snapshot.exists) {
          const userData = snapshot.data();
          // await AsyncStorage.setItem("role", userData?.role ?? "");
          // console.log("Role saved to AsyncStorage");

          setProfileData(userData);
          setIsProfileLoading(false);
        }
      },
      error => {
        console.error("Error fetching document: ", error);
        setIsProfileLoading(false);
      },
    );

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, [user?.uid]);

  return {
    isProfileLoading,
    profileData,
    refetchProfileData,
    setRefetchProfileData,
  };
};

export default useProfile;
