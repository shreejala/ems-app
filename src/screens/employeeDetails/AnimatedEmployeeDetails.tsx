import React, {useRef} from "react";
import {StyleSheet, View, Animated, VirtualizedList} from "react-native";

import {
  ContactDetails,
  SkillSet,
  ProjectsWorked,
  Experiences,
  AboutMe,
  OtherInterest,
  ImageComponent,
} from "./components";

import {useEmployeeDetail} from "../../hooks/useEmployeeDetails";
import {feedData} from "../../utils/feedData";

import EmployeeDetailStyle from "./style";

const animatedImageHeight = 400;

const AnimatedEmployeeDetails = ({route}) => {
  const userId = route.params?.employee;

  const AnimatedVirtualizedList =
    Animated.createAnimatedComponent(VirtualizedList);

  const scrollY = useRef(new Animated.Value(0)).current;

  const employeeDetail = useEmployeeDetail(userId);
  const sanitizedData = feedData(employeeDetail);

  const renderList = ({item}) => {
    switch (item.component) {
      case "contact":
        return <ContactDetails contactData={item.items} />;
      case "skills":
        return <SkillSet skillData={item.items} />;
      case "projects":
        return <ProjectsWorked projectData={item.items} />;
      case "experience":
        return <Experiences experienceData={item.items} />;
      case "aboutMe":
        return <AboutMe introData={item.items} />;
      case "otherInterest":
        return <OtherInterest otherData={item.items} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <ImageComponent
        scrollY={scrollY}
        avatar={employeeDetail?.profileImage}
        avatarTitle={employeeDetail?.name}
        avatarSubTitle={employeeDetail?.subtitle}
      />

      <AnimatedVirtualizedList
        contentContainerStyle={StyleSheet.flatten([
          EmployeeDetailStyle.content,
          {
            paddingTop: animatedImageHeight + 24,
            paddingBottom: animatedImageHeight,
          },
        ])}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}
        data={sanitizedData}
        renderItem={renderList}
        getItemCount={item => item.length}
        getItem={(item, index) => item[index]}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any, index) => `${item?.component}${index}`}
      />
    </View>
  );
};

export default AnimatedEmployeeDetails;
