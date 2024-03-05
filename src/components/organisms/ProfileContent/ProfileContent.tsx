import React from "react";
import {View} from "react-native";
import styles from "./styles";
import ProfileHeader from "../../molecules/Profile/ProfileHeader";
import {Divider} from "@rneui/themed";
import ProfileDetails from "./ProfileDetails";

const ProfileContent = ({userProfileData, navigation}) => {
  return (
    <View style={styles.profileContentContainer}>
      <ProfileHeader
        profileImage={userProfileData?.profileImage}
        username={userProfileData?.username}
        subtitle={userProfileData?.subtitle}
        linkedIn={userProfileData?.linkedIn}
        navigation={navigation}
      />
      <Divider />

      <ProfileDetails
        description={userProfileData?.description}
        skills={userProfileData?.skills}
        navigation={navigation}
        email={userProfileData?.email}
        tel={userProfileData?.tel}
        name={userProfileData?.name}
        experience={userProfileData?.experience}
        projects={userProfileData?.projectWorked}
      />
    </View>
  );
};

export default ProfileContent;
