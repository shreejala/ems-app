import React from "react";
import useProfile from "../../hooks/useProfile";
import {ActivityIndicator, View} from "react-native";
import {AppRoutes, AppStackScreenProps} from "../../routes/types";
import styles from "./styles";
import EditProfileDetailsContent from "../../components/organisms/EditProfileDetails/EditProfileDetailsContent";

const EditProfileDetails = ({navigation}: AppStackScreenProps<AppRoutes>) => {
  const {isProfileLoading, profileData} = useProfile();

  return (
    <View style={styles.editProfileDetailsContainer}>
      {isProfileLoading ? (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <EditProfileDetailsContent
          profileData={profileData}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default EditProfileDetails;
