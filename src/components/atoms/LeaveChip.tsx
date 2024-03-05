import {Text} from "@rneui/themed";
import React from "react";
import {StyleSheet, View, Platform} from "react-native";
import {Colors} from "../../constants/colors";

const styles = StyleSheet.create({
  leavesStyle: {
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowColor: Colors.gray,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

type LeaveChipProps = {
  index: number;
  leave: string;
};

const LeaveChip = ({index, leave}: LeaveChipProps) => {
  return (
    <View key={index} style={[styles.leavesStyle]}>
      <Text>{leave}</Text>
    </View>
  );
};

export default LeaveChip;
