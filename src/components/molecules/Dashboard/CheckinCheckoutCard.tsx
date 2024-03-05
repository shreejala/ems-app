import React, {useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Input, Text} from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Colors} from "../../../constants/colors";
import {
  getCurrentDate,
  handleCheckedIn,
  handleCheckedOut,
  handleEarlyCheckout,
  handleTimeDifference,
} from "./helper";
import {checkInCheckOutCardProps} from "../../../configs/types";
import useUserActivity from "../../../hooks/useUserActivity";
import {showToast} from "../../../utils/showToast";
import {wifiSSID} from "../../../utils/constants";
import DialogBox from "../DialogBox";

const CheckinCheckoutCard = ({
  uid,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  checkInData,
  ssid,
}: checkInCheckOutCardProps) => {
  const {saveUserActivityToFirestore} = useUserActivity();
  const [showDialog, setShowDialog] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  const [checkInDialog, setCheckInDialog] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (ssid?.includes("opencafe") && !checkIn) {
        setCheckInDialog(true);
      }
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [ssid, checkIn]);

  const onCheckInPress = () => {
    const {date, dateString} = getCurrentDate();
    const checkInObject = {
      checkIn: date.toString(),
      checkOut: "",
      date: date.toLocaleDateString(),
    };
    if (ssid?.includes(wifiSSID)) {
      saveUserActivityToFirestore(
        dateString,
        uid,
        checkInObject,
        "Check-in Successful",
      );
      setCheckIn(true);
    } else {
      showToast({
        type: "error",
        text1: "Error",
        text2: "You must be connected to OpenCafe Wifi to check-in",
      });
    }
  };

  const onCheckOutPress = () => {
    const {date, dateString} = getCurrentDate();
    const timeDifference = handleTimeDifference(
      checkInData?.checkIn,
      date.toString(),
    );
    if (!checkInData?.checkIn) {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Please check-in first",
      });

      return;
    }
    if (timeDifference) {
      const payload = {
        ...checkInData,
        checkOut: date.toString(),
        status: "completed",
      };

      saveUserActivityToFirestore(
        dateString,
        uid,
        payload,
        "Check-out successful",
      );
      setCheckOut(true);
    } else {
      setShowDialog(true);
    }
  };

  const renderDialogContent = () => {
    return (
      <Input
        placeholder="Reason"
        inputStyle={styles.inputStyle}
        value={textInputValue}
        onChange={e => setTextInputValue(e.nativeEvent.text)}
      />
    );
  };

  const handleCheckOutConfirmAction = () => {
    setShowDialog(false);
    handleEarlyCheckout(
      checkInData,
      textInputValue,
      uid,
      saveUserActivityToFirestore,
      setCheckOut,
    );
  };

  return (
    <View style={[styles.checkInCheckOutContainer, styles.dashboardCard]}>
      <View style={styles.contentStyle}>
        <Text style={styles.labelTextStyle}>Check-in</Text>
        <Text style={styles.checkInTimeStyle}>
          {checkInData?.checkIn
            ? new Date(checkInData?.checkIn).toLocaleTimeString()
            : "---"}
        </Text>
        <TouchableOpacity onPress={checkIn ? handleCheckedIn : onCheckInPress}>
          <Icon
            name="check"
            size={20}
            color={checkIn ? Colors.green : Colors.gray85}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentStyle}>
        <Text style={styles.labelTextStyle}>Check-out</Text>
        <Text style={styles.checkOutTimeStyle}>
          {checkInData?.checkOut
            ? new Date(checkInData?.checkOut).toLocaleTimeString()
            : "---"}
        </Text>
        <TouchableOpacity
          onPress={checkOut ? handleCheckedOut : onCheckOutPress}>
          <Icon
            name="check"
            size={20}
            color={checkOut ? Colors.green : Colors.gray85}
          />
        </TouchableOpacity>
      </View>

      <DialogBox
        showDialog={checkInDialog}
        title="Please check in for the record"
        primaryActionTitle="Ok"
        secondaryActionTitle="Cancel"
        onPressPrimaryAction={() => {
          onCheckInPress();
          setCheckInDialog(false);
        }}
        onPressSecondaryAction={() => setCheckInDialog(false)}
      />
      <DialogBox
        showDialog={showDialog}
        title="Reason for early leave"
        primaryActionTitle="Confirm"
        secondaryActionTitle="Cancel"
        onPressPrimaryAction={handleCheckOutConfirmAction}
        onPressSecondaryAction={() => setShowDialog(false)}
        children={renderDialogContent()}
      />
    </View>
  );
};

export default CheckinCheckoutCard;
