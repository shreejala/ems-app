import React from "react";
import {Text, View} from "react-native";
import {style} from "./style";

interface DropDetailsProp {
  label: string;
  value: string | number;
}
const DropDetails = ({label, value}: DropDetailsProp) => {
  return (
    <View style={style.descriptionContainer}>
      <Text style={style.titleStyle}>{label}</Text>
      <Text style={style.textColor}>{value}</Text>
    </View>
  );
};

export default DropDetails;
