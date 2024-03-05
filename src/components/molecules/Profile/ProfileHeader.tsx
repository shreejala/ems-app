import {Text} from "@rneui/themed";
import React from "react";
import {TouchableOpacity, View, Linking} from "react-native";
import styles from "./styles";
import {AppRoutes} from "../../../routes/types";
import ProfileImage from "../../atoms/ProfileImage";
import Icon from "react-native-vector-icons/AntDesign";

type profileHeaderType = {
  profileImage?: string;
  username: string;
  subtitle?: string;
  linkedIn?: string;
  navigation?: any;
};

const ProfileHeader = ({
  profileImage,
  username,
  subtitle,
  linkedIn,
  navigation,
}: profileHeaderType) => {
  return (
    <View style={styles.headerContainer}>
      <ProfileImage profileImage={profileImage} />
      <View style={styles.userProfileContent}>
        <Text style={styles.usernameStyle}>{username}</Text>
        {subtitle && <Text style={styles.jobTitle}>{subtitle}</Text>}
        {linkedIn && (
          <TouchableOpacity
            style={styles.linkedInIcon}
            onPress={() => {
              // navigation.navigate(AppRoutes.LinkedIn);
              Linking.openURL(linkedIn);
            }}>
            <Icon name="linkedin-square" size={24} color="#0077b5" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(AppRoutes.EditProfileDetails);
          }}>
          <Text style={styles.addJobTitle}>Edit Profile Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
