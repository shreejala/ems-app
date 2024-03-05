import {useState} from "react";
import firestore from "@react-native-firebase/firestore";

const useDeleteLeave = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteLeave = async (leaveId: string) => {
    try {
      setIsDeleting(true);
      await firestore().collection("Leaves").doc(leaveId).delete();
      setIsDeleting(false);
      setDeleteError(null);
    } catch (error) {
      console.error("Error deleting leave:", error);
      setIsDeleting(false);
      setDeleteError("Error deleting leave. Please try again.");
    }
  };

  return {
    isDeleting,
    deleteError,
    deleteLeave,
  };
};

export default useDeleteLeave;
