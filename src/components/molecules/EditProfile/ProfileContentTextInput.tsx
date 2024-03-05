import {Text} from "@rneui/base";
import {Input} from "@rneui/themed";
import React from "react";
import {KeyboardTypeOptions} from "react-native";
import {Control, Controller} from "react-hook-form";
import styles from "./style";

type inputFieldProps = {
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  labelText: string;
  secureTextEntry?: boolean;
  control: Control<any>;
  name: "description" | "username" | "subtitle" | "tel" | "linkedIn";
  error?: string;
  multiline?: boolean;
};

const ProfileContentTextInput = ({
  control,
  keyboardType,
  placeholder,
  labelText,
  secureTextEntry = false,
  name,
  error,
  multiline = false,
  ...rest
}: inputFieldProps) => {
  return (
    <>
      <Text style={styles.editProfileLabel}>{labelText}</Text>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={placeholder}
            inputStyle={styles.descriptionInputStyle}
            inputContainerStyle={
              multiline
                ? styles.descriptionMultilineStyle
                : styles.descriptionInputField
            }
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            multiline={multiline}
            {...rest}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default ProfileContentTextInput;
