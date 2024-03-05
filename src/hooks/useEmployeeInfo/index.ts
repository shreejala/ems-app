import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import {EmployeeType} from "../../components/organisms/HomeContent/HomeContent";
import useAuthenticate from "../useAuthenticate";

const useEmployeeInfo = () => {
  const [isEmployeeInfoRefresh, setEmployeeInfoRefresh] = useState(false);
  const [isEmployeeInfoLoading, setIsEmployeeInfoLoading] = useState(true);
  const [empData, setEmpData] = useState<EmployeeType[]>([]);
  const user = useAuthenticate();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Users")
      .orderBy("name")
      .where("uid", "!=", user?.uid || "")
      .onSnapshot(
        querySnapshot => {
          const fetchedEmpData = querySnapshot.docs.map(
            doc => doc.data() as EmployeeType,
          );
          setEmpData(fetchedEmpData);
          setIsEmployeeInfoLoading(false);
          setEmployeeInfoRefresh(false);
        },
        error => {
          console.error("Error fetching employee data:", error);
          setIsEmployeeInfoLoading(false);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [isEmployeeInfoRefresh, user?.uid]);

  const refreshEmployeeData = () => {
    setEmployeeInfoRefresh(!isEmployeeInfoRefresh);
  };

  return {
    isEmployeeInfoRefresh,
    isEmployeeInfoLoading,
    empData,
    refreshEmployeeData,
  };
};

export default useEmployeeInfo;
