import {useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

const useAuthenticate = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    // Cleanup the observer on unmount
    return () => unsubscribe();
  }, []);
  return user;
};
export default useAuthenticate;
