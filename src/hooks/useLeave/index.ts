import {useEffect, useState} from "react";
import firestore, {firebase} from "@react-native-firebase/firestore";
import {FirebaseLeaveData, TransformedLeaveData} from "../../configs/types";
import {
  startOfToday,
  isWithinInterval,
  parse,
  addDays,
  format,
  differenceInDays,
} from "date-fns";
import {leaveReasonEnum, leaveReasons} from "../../constants/leaveItems";

const useLeaveInfo = () => {
  const [leaveData, setLeaveData] = useState<FirebaseLeaveData[]>([]);
  const fetchData = async () => {
    try {
      const currentDate = new Date();
      const oneWeekFromNow = new Date(currentDate);
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 6);
      const leaveSnapshot = await firestore().collection("Leaves").get();
      const leavesData: FirebaseLeaveData[] = [];
      const promises = leaveSnapshot.docs.map(async doc => {
        const leave = doc.data() as FirebaseLeaveData;
        const userSnapshot = await firestore()
          .collection("Users")
          .doc(leave.applierId)
          .get();
        const userData = userSnapshot.data();

        leave.applicantUsername = userData?.username;

        leavesData.push(leave);
      });

      await Promise.all(promises);
      setLeaveData(leavesData);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const updateLeaveData = (
    acc: {leavesData: string[]; wfhData: string[]},
    leave: FirebaseLeaveData,
  ) => {
    const {applicantUsername, leaveReason, status} = leave;
    const isLeaveReasonIncluded = leaveReasons.includes(leaveReason);

    if (isLeaveReasonIncluded && applicantUsername && status === "Accept") {
      const dataToUpdate =
        isLeaveReasonIncluded && leaveReason !== leaveReasonEnum.WorkFromHome
          ? acc.leavesData
          : acc.wfhData;
      dataToUpdate.push(applicantUsername);
    }
  };

  const transformFirebaseData = (
    firebaseData: FirebaseLeaveData[],
  ): TransformedLeaveData[] => {
    const today = startOfToday();
    const nextWeek = addDays(today, 6);

    const transformedData: TransformedLeaveData[] = Array.from(
      {length: differenceInDays(nextWeek, today) + 1},
      (_, i) => transformLeaveDataForDay(addDays(today, i), firebaseData),
    );

    return transformedData;
  };

  const formatDates = (leaveStartDate: Date, leaveEndDate: Date) => {
    const formattedStartDate = format(leaveStartDate, "dd/MM/yyyy");
    const formattedEndDate = format(leaveEndDate, "dd/MM/yyyy");
    const startDate = parse(formattedStartDate, "dd/MM/yyyy", new Date());
    const endDate = parse(formattedEndDate, "dd/MM/yyyy", new Date());
    return {startDate, endDate};
  };

  const transformLeaveDataForDay = (
    currentDate: Date,
    firebaseData: FirebaseLeaveData[],
  ): TransformedLeaveData => {
    const formattedDate = format(currentDate, "yyyy-MM-dd");

    const {leavesData, wfhData} = firebaseData.reduce(
      (acc, leave) => {
        const leaveStartDate = new Date(leave.startDate.seconds * 1000);
        const leaveEndDate = new Date(leave.endDate.seconds * 1000);
        const {startDate, endDate} = formatDates(leaveStartDate, leaveEndDate);
        if (isWithinInterval(currentDate, {start: startDate, end: endDate})) {
          updateLeaveData(acc, leave);
        }
        return acc;
      },
      {leavesData: [] as string[], wfhData: [] as string[]},
    );

    return {date: formattedDate, leaveData: leavesData, wfhData};
  };

  return {leaveData, transformFirebaseData};
};

export default useLeaveInfo;
