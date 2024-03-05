import {Avatar} from "@rneui/themed";
import React from "react";
import {Text, View, ImageBackground, VirtualizedList} from "react-native";

import {AppRoutes, AppStackScreenProps} from "../../routes/types";
import ImageShimmerEffect from "../../components/atoms/ImageShimmerEffect";
import {useEmployeeDetail} from "../../hooks/useEmployeeDetails";

import EmployeeDetailStyle from "./style";
import {feedData} from "../../utils/feedData";
import ContactDetails from "./components/ContactDetails";
import SkillSet from "./components/SkillSet";
import ProjectsWorked from "./components/ProjectsWorked";
import Experiences from "./components/Experiences";
import AboutMe from "./components/AboutMe";
import OtherInterest from "./components/OtherInterest";

const EmployeeDetails = ({
  route,
}: AppStackScreenProps<AppRoutes.EmployeeDetails>) => {
  const userId = route.params?.employee;
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
    <View style={EmployeeDetailStyle.mainContainer}>
      <ImageBackground
        source={require("../../assets/teampic.jpg")}
        style={EmployeeDetailStyle.imageBgStyle}
        blurRadius={15}>
        <View style={EmployeeDetailStyle.containerStyle}>
          <Avatar
            size={120}
            rounded
            source={{
              uri:
                employeeDetail?.profileImage ||
                "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
            }}
            imageProps={{
              PlaceholderContent: (
                <ImageShimmerEffect
                  width={120}
                  height={120}
                  borderRadius={500}
                />
              ),
            }}
          />

          <View style={EmployeeDetailStyle.containerContentStyle}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={EmployeeDetailStyle.empNameStyle}>
              {employeeDetail?.name}
            </Text>
            <Text style={EmployeeDetailStyle.empSubtitleStyle}>
              {employeeDetail?.subtitle}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={EmployeeDetailStyle.secondContainerStyle}>
        <VirtualizedList
          data={sanitizedData}
          renderItem={renderList}
          getItemCount={item => item.length}
          getItem={(item, index) => item[index]}
        />
      </View>
    </View>
  );
};

export default EmployeeDetails;
