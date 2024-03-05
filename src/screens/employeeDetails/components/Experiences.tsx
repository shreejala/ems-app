import React from "react";
import {View, Text, FlatList} from "react-native";

import EmployeeDetailStyle from "../style";

interface ExperiencesProps {
  experienceData: string[];
}

const Experiences = ({experienceData}: ExperiencesProps) => {
  if (!experienceData || experienceData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }
  const renderExperience = ({item, index}) => {
    return (
      <View key={index} style={EmployeeDetailStyle.container}>
        <Text style={EmployeeDetailStyle.bulletPoint}>{"\u2022"}</Text>

        <Text style={EmployeeDetailStyle.text}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={EmployeeDetailStyle.contentGap}>
      <Text style={EmployeeDetailStyle.titleTextStyle}>Experiences</Text>

      <FlatList
        data={experienceData}
        renderItem={renderExperience}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Experiences;
