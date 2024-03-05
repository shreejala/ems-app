import {Text} from "@rneui/themed";
import React from "react";
import {View} from "react-native";
import {Colors} from "../../../constants/colors";
import styles from "./styles";

type DateComponentProps = {
  status: string;
  createdDate: any;
};

const DateComponent = ({status, createdDate}: DateComponentProps) => {
  const date = createdDate?.toDate().toDateString();
  return (
    <View>
      <View style={{width: 45}}>
        <Text
          style={[
            styles.statusText,
            {
              backgroundColor:
                status === "Reject"
                  ? Colors.red
                  : status === "Accept"
                    ? Colors.green
                    : Colors.yellow,
            },
          ]}>
          {date?.slice(3, 7).toUpperCase()}
        </Text>
        <Text style={styles.dayStyle}>{date?.slice(8, 10)}</Text>
      </View>

      <Text style={styles.yearStyle}>{date?.slice(11, 15)}</Text>
    </View>
  );
};

export default DateComponent;
