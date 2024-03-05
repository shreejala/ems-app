import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";
import styles from "./style";
import ProfileSkills from "../../atoms/ProfileSkills";

type SkillsContentProps = {
  skills: string[];
  setSkill: Dispatch<SetStateAction<string[]>>;
};

const SkillsContent = ({skills, setSkill}: SkillsContentProps) => {
  const handleDeleteSkill = skillToRemove => {
    setSkill(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
  };
  return (
    <View style={styles.skillContainer}>
      {skills.map(skill => (
        <ProfileSkills skill={skill} onPress={handleDeleteSkill} />
      ))}
    </View>
  );
};

export default SkillsContent;
