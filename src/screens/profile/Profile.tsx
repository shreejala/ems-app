import React from "react";
import {ActivityIndicator, View} from "react-native";
import {AppTabScreenProps, AppTabRoutes} from "../../routes/types";
import styles from "./styles";
import useProfile from "../../hooks/useProfile";
import ProfileContent from "../../components/organisms/ProfileContent/ProfileContent";

const Profile = ({navigation}: AppTabScreenProps<AppTabRoutes>) => {
  const {isProfileLoading, profileData} = useProfile();

  return (
    <View style={styles.profileContainer}>
      {isProfileLoading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ProfileContent userProfileData={profileData} navigation={navigation} />
      )}
    </View>
  );
};

export default Profile;
