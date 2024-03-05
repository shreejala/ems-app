import React from "react";
import {View} from "react-native";
import ProfileInfoFields from "../../atoms/ProfileInfoFields";
import styles from "./styles";

type ProfileUserInfoType = {
  email?: string;
  tel?: string;
  name?: string;
};

const ProfileUserInfo = ({email, tel, name}: ProfileUserInfoType) => {
  return (
    <View style={styles.userInfoContainer}>
      <ProfileInfoFields label="Email: " value={email} />
      {tel && <ProfileInfoFields label="Phone No: " value={tel} />}
      {name && <ProfileInfoFields label="Full Name: " value={name} />}
    </View>
  );
};

export default ProfileUserInfo;
