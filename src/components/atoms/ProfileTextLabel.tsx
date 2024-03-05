import {Text} from "@rneui/themed";
import React from "react";
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

type ProfileTextLabelProps = {
  label: string;
  onPress: () => void;
};

const ProfileTextLabel = ({label, onPress}: ProfileTextLabelProps) => {
  return (
    <TouchableOpacity style={styles.addAboutStyle} onPress={() => onPress()}>
      <Text style={styles.addDescriptionTextStyle}>{label}</Text>
      <Icon name="add" style={styles.addIconStyle} size={18} />
    </TouchableOpacity>
  );
};

export default ProfileTextLabel;
