import {Text} from "@rneui/themed";
import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";

import InputField from "../../molecules/Register/InputField";
import ButtonBlue from "../../atoms/ButtonBlue";
import styles from "./styles";
import LocationCheckbox from "../../atoms/LocationCheckbox";
import Toast from "react-native-toast-message";
import {RegisterPayload, registerFormProps} from "../../../configs/types";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ObjectSchema} from "yup";
import registerSchema from "../../../schema/registerSchema";

const RegisterForm = ({navigateToLogin, handleSignUp}: registerFormProps) => {
  const [location, setLocation] = useState({latitude: null, longitude: null});
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<RegisterPayload>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      name: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerSchema as ObjectSchema<RegisterPayload>),
  });

  useEffect(() => {
    register("email");
    register("password");
    register("username");
    register("confirmPassword");
    register("name");
  }, [register]);

  const onSignUpPress: SubmitHandler<RegisterPayload> = async data => {
    const {email, password, username, confirmPassword, name} = data;
    try {
      handleSignUp({
        email,
        password,
        username,
        name,
        location,
        setError,
        setIsSignUpLoading,
      });
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <Text style={styles.registerHeader}>Register !</Text>
        <Text style={styles.registerSubtitle}>
          Please register by entering your details
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.registerForm}>
          <InputField
            control={control}
            name="email"
            icon="mail"
            labelText="E-mail ID"
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email?.message}
          />

          <InputField
            control={control}
            name="username"
            icon="account-circle"
            labelText="Username"
            placeholder="Enter your username"
            keyboardType="default"
            error={errors.username?.message}
          />

          <InputField
            control={control}
            name="name"
            icon="emoji-people"
            labelText="Full Name"
            placeholder="Enter your full name"
            keyboardType="default"
            error={errors.name?.message}
          />

          <InputField
            type="password"
            control={control}
            name="password"
            icon="lock"
            labelText="New Password"
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry={true}
            error={errors.password?.message}
          />

          <InputField
            type="confirmPassword"
            control={control}
            name="confirmPassword"
            icon="lock"
            labelText="Confirm Password"
            placeholder="Confirm your password"
            keyboardType="default"
            secureTextEntry={true}
            error={errors.confirmPassword?.message}
          />

          <LocationCheckbox onLocationUpdate={setLocation} />

          <ButtonBlue
            title="Register"
            loading={isSignUpLoading}
            onPress={handleSubmit(onSignUpPress)}
          />
        </ScrollView>
      </View>

      <View style={styles.footerContainerStyle}>
        <Text style={styles.signupSubtitle}>Already have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigateToLogin();
          }}>
          Log in
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
