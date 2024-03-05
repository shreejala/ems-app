import {useCallback, useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {showToast} from "../../utils/showToast";
import {useToken} from "../useToken";
// import useRole from "../useRole";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLeaveDetail = () => {
  const [isLeaveDetailLoading, setIsLeaveDetailLoading] = useState(true);
  const [isLeaveDetailRefresh, setIsLeaveDetailRefresh] = useState(false);
  const [leaveData, setLeaveData] = useState<
    FirebaseFirestoreTypes.DocumentData[] | null
  >(null);
  const token = useToken();
  const [role, setRole] = useState<string | null>("");
  const [latestStatus, setLatestStatus] =
    useState<FirebaseFirestoreTypes.DocumentData | null>();

  const allLeaveData = useCallback(async () => {
    let leaveRef;

    if (role === "Employee") {
      leaveRef = firestore()
        .collection(`Leaves`)
        .orderBy("createdDate", "desc")
        .where("applierId", "==", token);
    } else if (role === "Admin") {
      leaveRef = firestore()
        .collection(`Leaves`)
        .orderBy("createdDate", "desc");
    }
    leaveRef.onSnapshot(async querySnapshot => {
      try {
        const data: FirebaseFirestoreTypes.DocumentData[] = await Promise.all(
          querySnapshot.docs.map(async doc => {
            const usrObj = await firestore()
              .collection("Users")
              .doc(doc.data().applierId)
              .get();

            return {
              ...doc.data(),
              user: usrObj.data(),
            };
          }),
        );

        setLeaveData(data);
        setIsLeaveDetailLoading(false);
        setIsLeaveDetailRefresh(false);
      } catch (error) {
        console.error(`Error fetching leave details`, error);
        setIsLeaveDetailLoading(false);
        setIsLeaveDetailRefresh(false);
      }
    });
  }, [token, role]);

  useEffect(() => {
    allLeaveData();
    const getRole = async () => {
      const userRole = await AsyncStorage.getItem("role");
      setRole(userRole ?? "Employee");
    };
    getRole();
  }, [isLeaveDetailRefresh, allLeaveData]);

  const refreshLeaveData = () => {
    setIsLeaveDetailRefresh(!isLeaveDetailRefresh);
  };
  const addLeave = async ({
    leaveType,
    leaveReason,
    reason,
    startDate,
    endDate,
    // approver,
    status,
  }) => {
    const leavesCollection = firestore().collection("Leaves");
    const leaveDocRef = await leavesCollection.add({
      applierId: token,
      leaveType,
      leaveReason,
      reason,
      startDate,
      endDate,
      // approver,
      status,
      createdDate: firestore.FieldValue.serverTimestamp(),
    });
    await leaveDocRef
      .update({
        leaveId: leaveDocRef.id,
      })
      .then(() => {
        showToast({type: "success", text1: "Leave Application Successful"});
      })
      .catch(error => {
        showToast({type: "error", text1: "Failed to submit leave application"});
      });
  };

  const getLatestLeaveStatus = useCallback(async () => {
    try {
      const leaveStatusRef = await firestore()
        .collection("Leaves")
        .orderBy("createdDate", "desc");

      const querySnapshot = await leaveStatusRef.get();
      const userLeaves = querySnapshot.docs.filter(
        doc => doc.data().applierId === token,
      );
      userLeaves[0] && setLatestStatus(userLeaves[0].data());
    } catch (error) {
      console.error("Error fetching latest leave status", error);
      return null;
    }
  }, [token]);

  useEffect(() => {
    const fetchLatestStatus = async () => {
      await getLatestLeaveStatus();
      // setLatestStatus(status);
    };

    fetchLatestStatus();
  }, [getLatestLeaveStatus]);
  return {
    addLeave,
    isLeaveDetailLoading,
    leaveData,
    isLeaveDetailRefresh,
    refreshLeaveData,
    getLatestLeaveStatus,
    latestStatus,
  };
};

export default useLeaveDetail;
