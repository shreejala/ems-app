import React, {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";

import {AuthRoutes, AuthStackScreenProps} from "../../routes/types";
import loginStyles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonBlue from "../../components/atoms/ButtonBlue";
import ReactNativeBiometrics from "react-native-biometrics";
import {signInHandler} from "./helper";
import useBiometrics from "../../hooks/useBiometrics";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import loginSchema from "../../schema/loginSchema";
import {LoginPayload} from "../../configs/types";
import {ObjectSchema} from "yup";
import LoginInputField from "../../components/molecules/Login/LoginInputField";
import {showToast} from "../../utils/showToast";

const Login = ({navigation}: AuthStackScreenProps<AuthRoutes.Login>) => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginSchema as ObjectSchema<LoginPayload>),
  });

  const {bioEmail, bioPassword, biometricEnabled} = useBiometrics();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const navigateToRegister = () => navigation.navigate(AuthRoutes.Register);

  const biometricsLogin = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .simplePrompt({
        promptMessage: "Confirm Fingerprint",
        cancelButtonText: "Dismiss",
      })
      .then(resultObject => {
        const {success, error} = resultObject;
        if (success) {
          signInHandler({
            email: bioEmail,
            password: bioPassword,
            biometricEnabled,
          });
        } else if (error) {
          showToast({
            type: "error",
            text1: "Login Failed",
            text2: "Biometrics failed",
          });
        }
      })
      .catch(error => {
        showToast({
          type: "error",
          text1: "Login Failed",
          text2: "Biometrics failed",
        });
      });
  };

  const submitHandler: SubmitHandler<LoginPayload> = async data => {
    const {email, password} = data;
    try {
      setIsLoginLoading(true);
      await signInHandler({
        email,
        password,
        biometricEnabled,
      });
      setIsLoginLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.contentContainer}>
        <Text style={loginStyles.loginHeader}>Welcome !</Text>
        <Text style={loginStyles.loginSubtitle}>
          We need your email and password to sign in.
        </Text>
        <View style={loginStyles.loginForm}>
          <LoginInputField
            control={control}
            name="email"
            icon="mail"
            labelText="E-mail ID"
            keyboardType="email-address"
            error={errors.email?.message}
            placeholder="Enter your email"
          />

          <LoginInputField
            type="password"
            control={control}
            name="password"
            icon="lock"
            labelText="Password"
            error={errors.password?.message}
            placeholder="Enter your password"
            secureTextEntry={true}
          />

          <ButtonBlue
            title="Login"
            onPress={handleSubmit(submitHandler)}
            loading={isLoginLoading}
          />
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Text style={loginStyles.forgotPasswordStyle}>Forgot Password ?</Text>
        </TouchableOpacity>
        {biometricEnabled ? (
          <TouchableOpacity
            style={loginStyles.fingerprintContainer}
            onPress={() => biometricsLogin()}>
            <Icon name="fingerprint" size={25} color="black" />
            <Text style={loginStyles.fingerprintText}>
              Use Fingerprint to Login
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <View style={loginStyles.footerContainerStyle}>
        <Text style={loginStyles.signupSubtitle}>Don't have an account?</Text>
        <Text
          style={loginStyles.signupText}
          onPress={() => navigateToRegister()}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default Login;
