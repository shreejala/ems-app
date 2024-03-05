import firestore from "@react-native-firebase/firestore";

interface ApprovalItemType {
  label: string;
  value: string;
}
export const getApproverItems = (uids, setApproverItems) => {
  try {
    const approverItems: ApprovalItemType[] = [];
    firestore()
      .collection("Users")
      // Filter results
      .where("uid", "in", uids)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          approverItems.push({
            label: documentSnapshot.data().name,
            value: documentSnapshot.data().deviceToken,
          });
        });
        setApproverItems(approverItems);
      });
  } catch (err) {
    console.error(err);
  }
};
