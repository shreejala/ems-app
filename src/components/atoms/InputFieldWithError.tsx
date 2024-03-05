import React from "react";
import {Input, InputProps} from "@rneui/themed";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/colors";

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    padding: 15,
  },
  inputStyle: {
    fontSize: 14,
  },
  errorTextStyle: {
    color: Colors.lightRed,
    marginBottom: 15,
  },
});

interface InputFieldWithErrorProps extends InputProps {
  errorMsg?: string;
}

const InputFieldWithError = ({
  errorMsg,
  ...props
}: InputFieldWithErrorProps) => {
  return (
    <View>
      <Input
        keyboardType="default"
        placeholder="Group name"
        inputStyle={styles.inputStyle}
        inputContainerStyle={StyleSheet.flatten([
          styles.inputField,
          errorMsg ? {borderColor: Colors.lightRed} : {},
        ])}
        containerStyle={{paddingHorizontal: 0}}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />

      {errorMsg && <Text style={styles.errorTextStyle}>{errorMsg}</Text>}
    </View>
  );
};

export default InputFieldWithError;
