import {Text} from "@rneui/themed";
import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import ClickableIcon from "../../atoms/ClickableIcon";
import {AppRoutes} from "../../../routes/types";
import ProfileSkills from "../../atoms/ProfileSkills";
import ProfileTextLabel from "../../atoms/ProfileTextLabel";
import ProfileUserInfo from "../../molecules/Profile/ProfileUserInfo";
import ExperienceContent from "../../molecules/EditProfile/ExperienceContent";
import {Colors} from "../../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import ProjectsWorkedContent from "../../molecules/Profile/ProjectsWorkedContent";

type profileDetailsProps = {
  description?: string;
  skills?: string[];
  navigation: any;
  email?: string;
  tel?: string;
  name?: string;
  experience?: string[];
  projects?: string[];
};

const ProfileDetails = ({
  description,
  skills,
  navigation,
  email,
  tel,
  name,
  experience,
  projects,
}: profileDetailsProps) => {
  const handleQRPress = () => {
    navigation.navigate(AppRoutes.QRScreen);
  };

  return (
    <View style={styles.profileDetailsContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileDetailsContent}>
        <View style={styles.profileDetailsSpacingStyle}>
          <View style={styles.profileDetailsWrapper}>
            <View style={styles.profileDetailsLabel}>
              <Text style={styles.profileDetailsDescriptionLabel}>
                User Info
              </Text>
              <ClickableIcon
                name="edit"
                onPress={() => {
                  navigation.navigate(AppRoutes.EditProfile);
                }}
              />
            </View>

            <ProfileUserInfo email={email} name={name} tel={tel} />
          </View>
          <View style={styles.profileDetailsWrapper}>
            <View style={styles.profileDetailsLabel}>
              <Text style={styles.profileDetailsDescriptionLabel}>
                About You
              </Text>
            </View>
            {description ? (
              <View style={styles.descriptionStyles}>
                <Text style={styles.descriptionTextStyle}>{description}</Text>
              </View>
            ) : (
              <ProfileTextLabel
                label="Add something about yourself"
                onPress={() => navigation.navigate(AppRoutes.EditProfile)}
              />
            )}
          </View>
          <View style={styles.profileDetailsWrapper}>
            <View style={styles.profileDetailsLabel}>
              <Text style={styles.profileDetailsDescriptionLabel}>Skills</Text>
            </View>
            {skills && skills?.length > 0 ? (
              <View style={[styles.skillContainer]}>
                {skills.map((skill, index) => (
                  <ProfileSkills key={index} skill={skill} />
                ))}
              </View>
            ) : (
              <ProfileTextLabel
                label="Add your skills"
                onPress={() => navigation.navigate(AppRoutes.EditProfile)}
              />
            )}
          </View>
          {experience && experience?.length > 0 && (
            <View style={styles.profileDetailsWrapper}>
              <View style={styles.profileDetailsLabel}>
                <Text style={styles.profileDetailsDescriptionLabel}>
                  Experience
                </Text>
              </View>
              <ExperienceContent experience={experience} />
            </View>
          )}
          {projects && projects?.length > 0 && (
            <View style={styles.profileDetailsWrapper}>
              <View style={styles.profileDetailsLabel}>
                <Text style={styles.profileDetailsDescriptionLabel}>
                  Projects Worked
                </Text>
              </View>
              <ProjectsWorkedContent projects={projects} />
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.qrStyle} onPress={handleQRPress}>
        <Icon name="qr-code" size={30} color={Colors.cyan500} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDetails;
