import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

const getNameInitialsFromName = (name: string | undefined) => {
  const splittedName = name ? name.split(" ") : [];
  const firstName = splittedName?.length > 0 ? splittedName[0].charAt(0) : "";
  const lastName =
    splittedName?.length > 1
      ? splittedName[splittedName?.length - 1].charAt(0)
      : "";

  return `${firstName}${lastName}`.toUpperCase();
};

const getFirstTwoLettersFromName = (name: string | undefined) => {
  const cleanedName = name ? name.replace(/\s+/g, "") : "";
  return cleanedName.slice(0, 2).toUpperCase();
};

const uploadImageToFirestore = async (
  image: any,
  uid: string,
  path: string,
) => {
  const imageRef = storage().ref(`${path}/${uid}`);
  await imageRef.putFile(image);
  const downloadURL = await imageRef.getDownloadURL();
  return downloadURL;
};

const leadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const getTime = (time: FirebaseFirestoreTypes.Timestamp) => {
  const formattedTime = `${leadingZero(time.toDate().getHours())}:${leadingZero(
    time.toDate().getMinutes(),
  )}`;
  return formattedTime;
};

export {
  getNameInitialsFromName,
  getFirstTwoLettersFromName,
  uploadImageToFirestore,
  getTime,
};
