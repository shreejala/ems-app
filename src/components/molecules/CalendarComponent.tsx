import React, {useState} from "react";
import {Calendar} from "react-native-calendars";
import {Colors} from "../../constants/colors";
import {Text, TouchableOpacity, View} from "react-native";
import {Input} from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";

import leaveStyles from "../organisms/LeaveApply/style";
import {BottomSheet} from "@rneui/themed";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {
  FirebaseFirestoreTypes,
  firebase,
} from "@react-native-firebase/firestore";

interface CalendarComponentProps {
  onSelectDate: (fireTime: FirebaseFirestoreTypes.Timestamp) => void;
  label: string;
  placeholder: string;
  value: FirebaseFirestoreTypes.Timestamp | null;
}

const CalendarComponent = ({
  onSelectDate,
  label,
  placeholder,
  value,
  ...props
}: CalendarComponentProps) => {
  const [selected, setSelected] = useState("");
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split("T")[0];

  const closeCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };
  const calendarValue = value ? value.toDate().toISOString().split("T")[0] : "";
  const handleDate = day => {
    const fireTime = firebase.firestore.Timestamp.fromDate(
      new Date(day.timestamp),
    );
    setSelected(day.dateString);
    onSelectDate(fireTime);
    closeCalendar();
  };

  return (
    <>
      <Text style={leaveStyles.leaveLabel}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          setCalendarVisible(!isCalendarVisible);
        }}>
        <Input
          placeholder={placeholder}
          inputStyle={leaveStyles.inputStyle}
          inputContainerStyle={leaveStyles.inputField}
          containerStyle={{paddingHorizontal: 0}}
          value={calendarValue}
          rightIcon={<Icon name="calendar" size={20} color={Colors.darkGray} />}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <BottomSheet
        isVisible={isCalendarVisible}
        onBackdropPress={closeCalendar}
        modalProps={{
          animationType: "fade",
        }}>
        <Calendar
          onDayPress={day => handleDate(day)}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.cyan500,
            },
          }}
          minDate={minDate}
          maxDate={maxDate}
          style={{paddingBottom: insets?.bottom}}
        />
      </BottomSheet>
    </>
  );
};

export default CalendarComponent;
