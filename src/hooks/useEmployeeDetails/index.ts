import {useState, useEffect} from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const useEmployeeDetail = userId => {
  const [employeeDetail, setEmployeeDetail] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userRef = await firestore().collection("Users").doc(userId).get();
        setEmployeeDetail(userRef.data());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserId();
    }
  }, [userId]);

  return employeeDetail;
};
