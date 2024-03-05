import {Text} from "@rneui/base";
import React from "react";
import {View} from "react-native";
import styles from "./styles";

type ProfileInfoType = {
  photos: string;
  followers: string;
  following: string;
};

const ProfileInfo = ({photos, followers, following}: ProfileInfoType) => {
  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.infoContent}>
        <Text style={styles.infoHeader}>{photos}</Text>
        <Text style={styles.infoLabel}>Photos</Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoHeader}>{followers}</Text>
        <Text style={styles.infoLabel}>Followers</Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoHeader}>{following}</Text>
        <Text style={styles.infoLabel}>Following</Text>
      </View>
    </View>
  );
};

export default ProfileInfo;
