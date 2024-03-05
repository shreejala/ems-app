import {Avatar} from "@rneui/themed";
import React from "react";
import styles from "./styles";
import {getFirstTwoLettersFromName} from "../../utils/globalHelpers";

type ProjectAvatarProps = {
  index: number;
  size: number;
  title: string;
};

const ProjectAvatar = ({index, size, title}: ProjectAvatarProps) => {
  return (
    <Avatar
      key={index}
      size={size}
      title={getFirstTwoLettersFromName(title)}
      containerStyle={styles.avatarStyle}
    />
  );
};

export default ProjectAvatar;
