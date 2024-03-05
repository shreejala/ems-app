import firestore from "@react-native-firebase/firestore";

export const getUserRole = async (token: string) => {
  const userRef = firestore().collection("Users").doc(token);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    return snapshot.data()?.role ?? "Employee";
  }

  return "";
};
