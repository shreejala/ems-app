import {Text} from "@rneui/themed";
import React from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "../EditProfile/style";
import ProjectAvatar from "../../atoms/ProjectAvatar";

type ProjectsWorkedContentProps = {
  projects: string[];
  setProjects?: React.Dispatch<React.SetStateAction<string[]>>;
};

const ProjectsWorkedContent = ({
  projects,
  setProjects,
}: ProjectsWorkedContentProps) => {
  const handleDeleteProject = projectToRemove => {
    setProjects &&
      setProjects(prevProject =>
        prevProject.filter(proj => proj !== projectToRemove),
      );
  };
  return (
    <View style={styles.projectContainer}>
      {projects.map((project, index) => (
        <TouchableOpacity
          style={styles.projectContent}
          onPress={() => handleDeleteProject(project)}>
          <ProjectAvatar index={index} size={40} title={project} key={index} />
          <Text style={styles.projectLabelStyle}>{project}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProjectsWorkedContent;
