import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

import EmployeeDetailStyle from "../style";
import ProjectAvatar from "../../../components/atoms/ProjectAvatar";

interface ProjectsWorkedProps {
  projectData: string[];
}

const ProjectsWorked = ({projectData}: ProjectsWorkedProps) => {
  if (!projectData || projectData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }

  return (
    <View style={EmployeeDetailStyle.contentGap}>
      <Text style={EmployeeDetailStyle.titleTextStyle}>Projects</Text>
      {projectData.map((project, index) => (
        <TouchableOpacity style={EmployeeDetailStyle.box}>
          <ProjectAvatar index={index} size={60} title={project} key={index} />

          <Text style={EmployeeDetailStyle.text}>{project}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProjectsWorked;
