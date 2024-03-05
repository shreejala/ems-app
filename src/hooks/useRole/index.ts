import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import {useToken} from "../useToken";

const useRole = () => {
  const token = useToken();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userDocument = await firestore()
          .collection("Users")
          .doc(token ? token : "")
          .get();

        if (userDocument.exists) {
          const role = userDocument.data()?.role;
          setUserRole(role);
        } else {
          console.log("User document does not exist");
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error getting user document:", error);
        setUserRole(null);
      }
    };

    if (token) {
      fetchUserRole();
    }
  }, [token]);

  return userRole;
};

export default useRole;
