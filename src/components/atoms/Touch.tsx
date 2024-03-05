import React, {FC} from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

export interface TouchProps extends TouchableOpacityProps {
  customTouchStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onTouchPress?: (() => void) | undefined;
  disabled?: boolean;
}

const Touch: FC<TouchProps> = ({
  customTouchStyle,
  children,
  onTouchPress,
  disabled,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      style={customTouchStyle}
      hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      activeOpacity={0.7}
      onPress={onTouchPress}
      disabled={disabled}
      {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

export default Touch;
