import React from "react";
import {FlatList, Text, View} from "react-native";

import EmployeeDetailStyle from "../style";

interface SkillSetProps {
  skillData: string[];
}

const SkillSet = ({skillData}: SkillSetProps) => {
  if (!skillData || skillData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }
  const renderSkillSet = ({item, index}) => {
    return (
      <View key={`${index}${item}`} style={EmployeeDetailStyle.chipStyle}>
        <Text style={EmployeeDetailStyle.text}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={EmployeeDetailStyle.contentGap}>
      <Text style={EmployeeDetailStyle.titleTextStyle}>Skills</Text>

      <FlatList
        data={skillData}
        renderItem={renderSkillSet}
        horizontal
        keyExtractor={item => `${item}${skillData}`}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SkillSet;
