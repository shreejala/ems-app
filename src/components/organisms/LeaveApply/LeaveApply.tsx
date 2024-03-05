import {Input} from "@rneui/base";
import React, {useState} from "react";
import {Text, ScrollView, View} from "react-native";

import ButtonBlue from "../../atoms/ButtonBlue";
import CalendarComponent from "../../molecules/CalendarComponent";
import {showToast} from "../../../utils/showToast";
import {sendNotification} from "../../../utils/notificationUtils";
import usePushNotify from "../../../hooks/usePushNotify";
import {
  leaveReasonItem,
  leaveStatus,
  leaveTypeItem,
} from "../../../constants/leaveItems";
import useProfile from "../../../hooks/useProfile";

import leaveStyles from "./style";
import DropDownInput from "../../molecules/DropDownInput";
// import {getApproverItems} from "../../../utils/getApproverItems";
import useLeaveDetail from "../../../hooks/useLeaveDetails";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {getDateOnly} from "../../../utils/getDateOnly";
import getCurrentDate from "../../../utils/getCurrentDate";

const LeaveApply = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [isAddLeaveLoading, setIsAddLeaveLoading] = useState(false);
  // const [approverItems, setApproverItems] = useState([]);
  const [leaveTypeItems, setLeaveTypeItems] = useState(leaveTypeItem);
  const [leaveReasonItems, setLeaveReasonItems] = useState(leaveReasonItem);
  // const [approver, setApprover] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] =
    useState<FirebaseFirestoreTypes.Timestamp | null>(null);
  const [endDate, setEndDate] =
    useState<FirebaseFirestoreTypes.Timestamp | null>(null);
  const {addLeave, refreshLeaveData, latestStatus} = useLeaveDetail();
  const {sendPushNotify} = usePushNotify();
  const {profileData} = useProfile();
  const resetForm = () => {
    setLeaveType("");
    setLeaveReason("");
    // setApprover("");
    setReason("");
    setStartDate(null);
    setEndDate(null);
  };

  const submitHandler = async () => {
    // Validation checks
    if (!leaveType || !reason || !startDate || !endDate /* || !approver */) {
      showToast({
        type: "error",
        text1: "Leave application failed",
        text2: "All fields must be filled out",
      });
      return;
    }

    // Check if startDate is greater than endDate
    if (startDate > endDate) {
      showToast({
        type: "error",
        text1: "Leave application failed",
        text2: "Start date cannot be greater than end date",
      });
      return;
    }

    // Check if the latest leave status is "Pending"
    if (latestStatus?.status === leaveStatus.Pending) {
      showToast({
        type: "error",
        text1: "Leave application failed",
        text2: "Previous leave is still on Pending",
      });
      return;
    }

    const latestCurrentDate = getDateOnly(latestStatus?.createdDate);
    // Check only one leave a day allowed
    if (latestCurrentDate === getCurrentDate()) {
      showToast({
        type: "error",
        text1: "Leave application failed",
        text2: "One leave per day is allowed.",
      });
      return;
    }

    const fullName = profileData?.name;
    const firstName = fullName ? fullName.split(" ")[0] : "";

    try {
      setIsAddLeaveLoading(true);
      await addLeave({
        leaveType,
        leaveReason,
        reason,
        startDate,
        endDate,
        // approver,
        status: leaveStatus.Pending,
      });
      showToast({type: "success", text1: "Leave Application Successful"});
      refreshLeaveData();
      setIsAddLeaveLoading(false);

      const body = `${firstName} applied for ${
        leaveReason === "Work from home" ? "work from home" : "leave"
      } on ${startDate.toDate().toDateString()} to ${endDate
        .toDate()
        .toDateString()}`;

      sendNotification({
        sendPushNotify,
        title: "Leave Application",
        body,
        onSuccessCallback: response => {
          console.log("Notification sent successfully:", response);
        },
        onErrorCallback: error => {
          console.error("Error sending notification:", error);
        },
      });

      resetForm();
    } catch (error) {
      showToast({type: "error", text1: "Failed to submit leave application"});
      setIsAddLeaveLoading(false);
    }
  };

  // useEffect(() => {
  //   getApproverItems(
  //     ["T5mqvZ0huFfJka0Hu9pXQPyQLT63", "NAHGxcKaLbY712nC0R5egGF6zMp2"],
  //     setApproverItems,
  //   );
  // }, []);

  return (
    <ScrollView style={leaveStyles.leaveForm}>
      <DropDownInput
        placeholder="Select reason of leave"
        label="Leave Reason"
        value={leaveReason}
        items={leaveReasonItems}
        setValue={setLeaveReason}
        setItems={setLeaveReasonItems}
        zIndex={2000}
      />

      <DropDownInput
        placeholder="Select type of leave"
        label="Leave Type"
        value={leaveType}
        items={leaveTypeItems}
        setValue={setLeaveType}
        setItems={setLeaveTypeItems}
        zIndex={1000}
      />

      <Text style={leaveStyles.leaveLabel}>Reason</Text>
      <Input
        keyboardType="default"
        placeholder="Enter your reason"
        inputStyle={leaveStyles.inputStyle}
        inputContainerStyle={leaveStyles.inputField}
        containerStyle={{paddingHorizontal: 0}}
        value={reason}
        onChange={e => setReason(e.nativeEvent.text)}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <CalendarComponent
        label="Start Date"
        placeholder="Enter leave start date"
        value={startDate}
        onSelectDate={selectedDate => setStartDate(selectedDate)}
      />

      <CalendarComponent
        label="End Date"
        placeholder="Enter leave end date"
        value={endDate}
        onSelectDate={selectedDate => setEndDate(selectedDate)}
      />

      {/* <DropDownInput
        placeholder="Select approvers"
        label="Approvers"
        value={approver}
        items={approverItems}
        setValue={setApprover}
        setItems={setApproverItems}
      /> */}

      <View style={{marginVertical: 30}}>
        <ButtonBlue
          title="Apply"
          loading={isAddLeaveLoading}
          onPress={() => submitHandler()}
        />
      </View>
    </ScrollView>
  );
};

export default LeaveApply;
