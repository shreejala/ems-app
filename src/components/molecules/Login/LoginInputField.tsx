import {Text} from "@rneui/base";
import {Input} from "@rneui/themed";
import React from "react";
import {KeyboardTypeOptions} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import {Colors} from "../../../constants/colors";
import {Control, Controller} from "react-hook-form";
import {LoginPayload} from "../../../configs/types";
import PasswordInputField from "../../atoms/PasswordInputField";

type inputFieldProps = {
  type?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  labelText: string;
  icon: string;
  secureTextEntry?: boolean;
  control: Control<LoginPayload>;
  name: "email" | "password";
  error?: string;
};

const LoginInputField = ({
  type,
  control,
  keyboardType,
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
      <Text style={styles.loginLabel}>{labelText}</Text>
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

export default LoginInputField;
