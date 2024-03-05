import {Text} from "@rneui/base";
import {Input} from "@rneui/themed";
import React from "react";
import {KeyboardTypeOptions, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import {Colors} from "../../../constants/colors";
import {Control, Controller} from "react-hook-form";
import {RegisterPayload} from "../../../configs/types";
import PasswordInputField from "../../atoms/PasswordInputField";

type inputFieldProps = {
  type?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  labelText: string;
  icon: string;
  secureTextEntry?: boolean;
  control: Control<RegisterPayload>;
  name: "email" | "username" | "name" | "password" | "confirmPassword";
  error?: string;
};

const InputField = ({
  control,
  keyboardType,
  type,
  placeholder,
  labelText,
  icon,
  secureTextEntry = false,
  name,
  error,
  ...rest
}: inputFieldProps) => {
  return (
    <>
      <Text style={styles.registerLabel}>{labelText}</Text>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            {type === "password" || type === "confirmPassword" ? (
              <PasswordInputField
                placeholder={placeholder}
                icon={icon}
                keyboardType={keyboardType}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                rightIcon="remove-red-eye"
                {...rest}
              />
            ) : (
              <Input
                placeholder={placeholder}
                leftIcon={
                  <Icon name={icon} size={20} color={Colors.darkGray} />
                }
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputField}
                keyboardType={keyboardType}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                {...rest}
              />
            )}
          </>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default InputField;
