import React from "react";
import {View, Text, FlatList} from "react-native";
import {Image} from "@rneui/base";

import ImageShimmerEffect from "../../../components/atoms/ImageShimmerEffect";
import EmployeeDetailStyle from "../style";

interface OtherInterestProps {
  otherData: string[];
}

const OtherInterest = ({otherData}: OtherInterestProps) => {
  if (!otherData || otherData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }
  const renderProjectWorkedOn = ({item, index}) => {
    return (
      <View key={`${index}.1`} style={EmployeeDetailStyle.projectContainer}>
        <Image
          source={{
            uri: item,
          }}
          borderRadius={30}
          PlaceholderContent={<ImageShimmerEffect height={200} width={250} />}
          placeholderStyle={EmployeeDetailStyle.projectPlaceholderStyle}
          style={EmployeeDetailStyle.projectImage}
        />
        <Text style={EmployeeDetailStyle.projectText}>Miferia</Text>
      </View>
    );
  };

  return (
    <View style={EmployeeDetailStyle.contentGap}>
      <Text style={EmployeeDetailStyle.titleTextStyle}>Other Interests</Text>

      <FlatList
        data={otherData}
        renderItem={renderProjectWorkedOn}
        horizontal
        contentContainerStyle={EmployeeDetailStyle.flatListStyle}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default OtherInterest;
