import React from "react";
import {View, Text} from "react-native";

import EmployeeDetailStyle from "../style";

interface AboutMeProps {
  introData: string;
}

const AboutMe = ({introData}: AboutMeProps) => {
  if (!introData || introData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }
  return (
    <View style={EmployeeDetailStyle.contentGap}>
      <Text style={EmployeeDetailStyle.titleTextStyle}>About Me</Text>

      <Text style={EmployeeDetailStyle.text}>{introData}</Text>
    </View>
  );
};

export default AboutMe;
