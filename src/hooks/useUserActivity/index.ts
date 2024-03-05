import firestore from "@react-native-firebase/firestore";
import {
  CheckInObjectType,
  CheckOutType,
  UserActivityPayloadType,
} from "../../configs/types";
import {useEffect, useState} from "react";
import {showToast} from "../../utils/showToast";
import useAuthenticate from "../useAuthenticate";

const useUserActivity = () => {
  const user = useAuthenticate();
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [checkInData, setCheckInData] = useState({
    checkIn: "",
    checkOut: "",
    date: "",
  });

  useEffect(() => {
    const fetchCheckInCheckOut = async () => {
      const date = new Date();
      const dateString = date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
      });
      const docRef = firestore().collection("UserActivity").doc(user?.uid);

      await docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            if (data && data[dateString]?.checkIn) {
              setCheckIn(true);
            }
            if (data && data[dateString]?.checkOut) {
              setCheckOut(true);
            }
            data && setCheckInData(data[dateString]);
          }
        })
        .catch(error => {
          console.error("Error getting document:", error);
        });
    };
    fetchCheckInCheckOut();
  }, [checkIn, checkOut, user?.uid]);

  const saveUserActivityToFirestore = async (
    dateString: string,
    uid: string | undefined,
    payload: UserActivityPayloadType | CheckInObjectType | CheckOutType,
    message: string,
  ) => {
    const docRef = firestore().collection("UserActivity").doc(uid);
    await docRef
      .set(
        {
          [dateString]: payload,
        },
        {merge: true},
      )
      .then(() => {
        showToast({type: "success", text1: "Success", text2: `${message}`});
      })
      .catch(error => {
        console.error("Error adding data: ", error);
      });
  };

  return {
    saveUserActivityToFirestore,

    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    setCheckInData,
    checkInData,
  };
};

export default useUserActivity;
