import {Text} from "@rneui/base";
import React from "react";
import {TouchableOpacity} from "react-native";
import styles from "./styles";

type ProfileSkillsProps = {
  skill: string;
  onPress?: (string) => void;
};

const ProfileSkills = ({skill, onPress}: ProfileSkillsProps) => {
  return (
    <TouchableOpacity
      style={styles.skillContent}
      onPress={() => onPress && onPress(skill)}>
      <Text style={styles.skillText}>{skill}</Text>
    </TouchableOpacity>
  );
};

export default ProfileSkills;
