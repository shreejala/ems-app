import React from "react";
import useProfile from "../../hooks/useProfile";
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";
import EditProfileContent from "../../components/organisms/EditProfile/EditProfileContent";
import {AppRoutes, AppStackScreenProps} from "../../routes/types";

const EditProfile = ({navigation}: AppStackScreenProps<AppRoutes>) => {
  const {isProfileLoading, profileData, setRefetchProfileData} = useProfile();

  return (
    <View style={styles.editProfileContainer}>
      {isProfileLoading ? (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <EditProfileContent
          profileData={profileData}
          navigation={navigation}
          setRefetchProfileData={setRefetchProfileData}
        />
      )}
    </View>
  );
};

export default EditProfile;
