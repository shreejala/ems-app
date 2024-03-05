import React from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./style";
import {Text} from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../../../constants/colors";

type ExperienceContentType = {
  experience?: string[];
  setExperience?: React.Dispatch<React.SetStateAction<string[]>>;
  showDeleteIcon?: boolean;
};

const ExperienceContent = ({
  experience,
  setExperience,
  showDeleteIcon = false,
}: ExperienceContentType) => {
  const handleDeleteExperience = experienceToRemove => {
    setExperience &&
      setExperience(prevExperience =>
        prevExperience.filter(exp => exp !== experienceToRemove),
      );
  };
  return (
    <View style={styles.experienceContainer}>
      {experience?.map((exp, i) => {
        return (
          <View key={i} style={styles.experienceContent}>
            <Text style={styles.experienceTextLabel}>{exp}</Text>
            {showDeleteIcon && (
              <TouchableOpacity onPress={() => handleDeleteExperience(exp)}>
                <Icon name="delete" size={20} color={Colors.lightRed} />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default ExperienceContent;
