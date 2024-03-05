import React from "react";
import {Icon, Input, InputProps} from "@rneui/themed";
import {StyleProp, TextStyle} from "react-native";

import HomeContentStyles from "../organisms/HomeContent/style";

interface SearchComponentProps extends InputProps {
  placeholder: string;
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  iconColor: string | number;
  iconSize: number;
  iconStyle?: TextStyle;
}

const SearchComponent = ({
  placeholder,
  style,
  value,
  onChangeText,
  iconColor,
  iconStyle,
  iconSize,
  ...props
}: SearchComponentProps) => {
  return (
    <Input
      placeholder={placeholder}
      style={style}
      leftIcon={
        <Icon
          name="search"
          color={iconColor}
          size={iconSize}
          style={iconStyle}
          solid
        />
      }
      inputContainerStyle={HomeContentStyles.inputContentStyle}
      value={value}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default SearchComponent;
