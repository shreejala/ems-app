import {Input} from "@rneui/themed";
import React, {useState} from "react";
import {KeyboardTypeOptions, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../../constants/colors";
import styles from "./styles";

type passwordInputFieldProps = {
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  rightIcon: string;
  onChange: any;
  onBlur: any;
  value: any;
};

const PasswordInputField = ({
  placeholder,
  keyboardType,
  icon,
  rightIcon,
  onChange,
  onBlur,
  value,
  ...rest
}: passwordInputFieldProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const secureTextEntryDisable = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <Input
      placeholder={placeholder}
      leftIcon={<Icon name={icon} size={20} color={Colors.darkGray} />}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputField}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      onChangeText={onChange}
      onBlur={onBlur}
      value={value}
      rightIcon={
        <TouchableOpacity onPress={() => secureTextEntryDisable()}>
          <Icon name={rightIcon} size={20} color={Colors.darkGray} />
        </TouchableOpacity>
      }
      {...rest}
    />
  );
};

export default PasswordInputField;
