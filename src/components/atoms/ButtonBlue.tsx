import {Button, ButtonProps} from "@rneui/themed";
import React from "react";
import styles from "./styles";
import {Colors} from "../../constants/colors";

interface ButtonBlueType extends ButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
}

const ButtonBlue = ({title, onPress, loading, ...props}: ButtonBlueType) => {
  return (
    <Button
      color={Colors.cyan500}
      title={title}
      buttonStyle={styles.loginButtonStyle}
      onPress={onPress}
      loading={loading}
      {...props}
    />
  );
};

export default ButtonBlue;
