import Toast from "react-native-toast-message";
import {
  CheckInDataProps,
  CheckInObjectType,
  CheckOutType,
  UserActivityPayloadType,
} from "../../../configs/types";
import {wifiSSID} from "../../../utils/constants";
import {showToast} from "../../../utils/showToast";

type SaveUserActivityToFirestoreType = (
  dateString: string,
  uid: string | undefined,
  payload: UserActivityPayloadType | CheckInObjectType | CheckOutType,
  message: string,
) => Promise<void>;

export const getCurrentDate = () => {
  const date = new Date();
  const dateString = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  return {date, dateString};
};

export const handleCheckedIn = () =>
  showToast({
    type: "error",
    text1: "Already Checked-in",
  });

export const handleCheckedOut = () => {
  showToast({
    type: "error",
    text1: "Already Checked-out",
  });
};

export const handleTimeDifference = (
  prevTime: string | undefined,
  currentTime: string | undefined,
) => {
  if (prevTime === undefined || currentTime === undefined) return false;
  const prevTimeDate = new Date(prevTime);
  const currentTimeDate = new Date(currentTime);

  const timeDifference = currentTimeDate.getTime() - prevTimeDate.getTime();
  const eightHours = 8 * 60 * 60 * 1000;

  if (timeDifference >= eightHours) {
    return true;
  } else {
    return false;
  }
};

export const handleEarlyCheckout = (
  checkInData: CheckInDataProps | undefined,
  textInputValue: string,
  uid: string | undefined,
  saveUserActivityToFirestore: SaveUserActivityToFirestoreType,
  setCheckOut: (checkOut: boolean) => void,
) => {
  const {date, dateString} = getCurrentDate();
  const payload = {
    ...checkInData,
    checkOut: date.toString(),
    reason: textInputValue,
    status: "not-completed",
  };
  if (textInputValue !== "") {
    saveUserActivityToFirestore(
      dateString,
      uid,
      payload,
      "Check-out Successful",
    );
    setCheckOut(true);
  } else {
    showToast({
      type: "error",
      text1: "Please enter a reason",
    });
  }
};
