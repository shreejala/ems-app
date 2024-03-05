import {Text} from "@rneui/themed";
import React from "react";
import {View} from "react-native";
import {Colors} from "../../constants/colors";
import styles from "./styles";

type DateComponentProps = {
  width?: number;
  height?: number;
  status?: string;
  createdDate: string;
};

const DateComponent = ({
  width,
  height,
  status,
  createdDate,
}: DateComponentProps) => {
  const dateColorPicker = () =>
    status === "Reject" || status === "leave"
      ? Colors.red
      : status === "Accept" || status === "work from home"
        ? Colors.green
        : Colors.red;

  return (
    <View>
      <View
        style={{
          width: width ? width : 45,
          height: height ? height : 50,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: dateColorPicker(),
        }}>
        <View
          style={[
            {
              height: "40%",
              borderBottomColor: dateColorPicker(),
              backgroundColor: dateColorPicker(),
              justifyContent: "center",
              alignItems: "center",
            },
          ]}>
          <Text style={[styles.statusText]}>
            {createdDate.slice(0, 3).toUpperCase()}
          </Text>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayStyle}>{createdDate.slice(3, 6)}</Text>
        </View>
      </View>

      <Text style={styles.yearStyle}>{createdDate.slice(7, 12)}</Text>
    </View>
  );
};

export default DateComponent;
