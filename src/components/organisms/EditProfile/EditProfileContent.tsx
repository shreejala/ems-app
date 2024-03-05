import React, {useEffect, useRef, useState} from "react";
import {ScrollView, View} from "react-native";
import styles from "./style";
import {Input, Text} from "@rneui/themed";
import SkillsContent from "../../molecules/EditProfile/SkillsContent";
import ButtonBlue from "../../atoms/ButtonBlue";
import useAuthenticate from "../../../hooks/useAuthenticate";
import ExperienceContent from "../../molecules/EditProfile/ExperienceContent";
import {
  handleAddContent,
  handleProfileDataPopulate,
  handleProfileEditPress,
} from "./helper";
import {
  EditProfileContentProps,
  ProfileContentPayload,
} from "../../../configs/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ObjectSchema} from "yup";
import ProfileContentSchema from "../../../schema/profileContetSchema";
import ProfileContentTextInput from "../../molecules/EditProfile/ProfileContentTextInput";
import ProjectsWorkedContent from "../../molecules/Profile/ProjectsWorkedContent";

const EditProfileContent = ({
  profileData,
  navigation,
}: EditProfileContentProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ProfileContentPayload>({
    defaultValues: {
      description: "",
      skills: [],
      experience: [],
    },
    mode: "onBlur",
    resolver: yupResolver(
      ProfileContentSchema as ObjectSchema<ProfileContentPayload>,
    ),
  });

  const [isProfileUpdateLoading, setIsProfileUpdateLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [currentExperience, setCurrentExperience] = useState("");
  const [projects, setProjects] = useState<string[]>([]);
  const [currentProject, setCurrentProject] = useState("");
  const scrollViewRef = React.useRef<ScrollView>(null);
  const user = useAuthenticate();

  useEffect(() => {
    handleProfileDataPopulate(
      profileData?.description,
      setValue,
      profileData?.skills,
      setSkills,
      profileData?.experience,
      setExperience,
      profileData?.projectWorked,
      setProjects,
    );
  }, [
    profileData?.description,
    profileData?.skills,
    profileData?.experience,
    profileData?.projectWorked,
    setValue,
  ]);

  return (
    <View style={styles.editProfileContainer}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles.editProfileContent}>
        <ProfileContentTextInput
          control={control}
          name="description"
          labelText="Edit your description"
          placeholder="Enter your description"
          multiline={true}
          error={errors.description?.message}
        />

        <View>
          <Text style={styles.editProfileLabel}>Edit your skills</Text>
          <Input
            placeholder="eg.  React"
            inputStyle={styles.descriptionInputStyle}
            inputContainerStyle={[styles.descriptionInputField]}
            returnKeyType="done"
            onSubmitEditing={() =>
              handleAddContent(currentSkill, setSkills, setCurrentSkill)
            }
            value={currentSkill}
            onChange={e => setCurrentSkill(e.nativeEvent.text)}
          />
        </View>
        <SkillsContent skills={skills} setSkill={setSkills} />
        <View style={styles.experienceContainer}>
          <Text style={styles.editProfileLabel}>Add your experience</Text>
          <Input
            placeholder="Add your experience"
            inputStyle={styles.descriptionInputStyle}
            inputContainerStyle={[styles.descriptionInputField]}
            returnKeyType="done"
            onSubmitEditing={() =>
              handleAddContent(
                currentExperience,
                setExperience,
                setCurrentExperience,
              )
            }
            value={currentExperience}
            onChange={e => setCurrentExperience(e.nativeEvent.text)}
          />

          <ExperienceContent
            experience={experience}
            setExperience={setExperience}
            showDeleteIcon={true}
          />
        </View>
        <View>
          <Text style={styles.editProfileLabel}>Add your project</Text>
          <Input
            placeholder="Add your project"
            inputStyle={styles.descriptionInputStyle}
            inputContainerStyle={[styles.descriptionInputField]}
            returnKeyType="done"
            onSubmitEditing={() =>
              handleAddContent(
                currentProject,
                setProjects,
                setCurrentProject,
                scrollViewRef,
              )
            }
            value={currentProject}
            autoCorrect={false}
            onChange={e => setCurrentProject(e.nativeEvent.text)}
          />
        </View>
        <ProjectsWorkedContent projects={projects} setProjects={setProjects} />
      </ScrollView>

      <ButtonBlue
        title="Submit"
        loading={isProfileUpdateLoading}
        onPress={handleSubmit(data =>
          handleProfileEditPress(
            user?.uid,
            data.description,
            skills,
            experience,
            projects,
            setIsProfileUpdateLoading,
            navigation,
          ),
        )}
      />
    </View>
  );
};

export default EditProfileContent;
