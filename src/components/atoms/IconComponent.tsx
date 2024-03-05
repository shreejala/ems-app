import React from "react";
import {Icon, IconProps} from "@rneui/themed";
import {TextStyle} from "react-native";

interface IconComponentProps extends Omit<IconProps, "name"> {
  iconName: string;
  iconColor: string | number;
  iconSize: number;
  iconStyle?: TextStyle;
}
const IconComponent = ({
  iconName,
  iconColor,
  iconSize,
  iconStyle,
  ...props
}: IconComponentProps) => {
  return (
    <Icon
      name={iconName}
      color={iconColor}
      size={iconSize}
      style={iconStyle}
      solid
      {...props}
    />
  );
};

export default IconComponent;
