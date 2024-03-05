import {Icon} from "@rneui/themed";
import React from "react";
import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";

type clickableIconType = {
  name: string;
  onPress: () => void;
  size?: number;
  color?: string;
  type?: string;
  style?: StyleProp<ViewStyle>;
};

const ClickableIcon = ({
  name,
  onPress,
  size = 20,
  color,
  style,
  type,
  ...props
}: clickableIconType) => {
  return (
    <TouchableOpacity
      {...props}
      style={style}
      onPress={() => onPress()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Icon
        name={name}
        type={type}
        size={size}
        color={color ? color : "black"}
      />
    </TouchableOpacity>
  );
};

export default ClickableIcon;
