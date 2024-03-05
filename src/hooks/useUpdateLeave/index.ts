import firestore from "@react-native-firebase/firestore";
import {showToast} from "../../utils/showToast";

export const useUpdateLeave = () => {
  const updateLeaveStatus = async (leaveId, value) => {
    try {
      if (leaveId) {
        await firestore()
          .collection(`Leaves`)
          .doc(leaveId)
          .update({status: value});

        showToast({
          type: "info",
          text1: `You have ${value.toLowerCase()}ed the leave`, // Corrected toLowerCase
        });
      } else {
        console.error("Invalid userId or leaveId");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return updateLeaveStatus;
};
