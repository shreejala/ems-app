import {Text} from "@rneui/base";
import React from "react";
import {View} from "react-native";
import styles from "./styles";

type ProfileInfoFieldsType = {
  label: string;
  value?: string;
};

const ProfileInfoFields = ({label, value}: ProfileInfoFieldsType) => {
  return (
    <View style={styles.infoFieldStyle}>
      <Text style={styles.infoFieldLabel}>{label} </Text>
      <Text style={styles.infoFieldText}>{value}</Text>
    </View>
  );
};

export default ProfileInfoFields;
