import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {AuthRoutes, AuthStackScreenProps} from "../../routes/types";
import loginDashboardStyles from "./styles";

const LoginDashboard = ({navigation}: AuthStackScreenProps<AuthRoutes>) => {
  const routeToLogin = () => {
    navigation.navigate(AuthRoutes.Login);
  };

  const routeToRegister = () => {
    navigation.navigate(AuthRoutes.Register);
  };
  return (
    <View style={loginDashboardStyles.container}>
      <Text style={loginDashboardStyles.titleText}>
        Co-Existence & Co-Prosperity
      </Text>

      <View style={loginDashboardStyles.imageContainer}>
        <Image
          style={loginDashboardStyles.image}
          source={require("../../assets/logo.png")}
        />
      </View>

      <TouchableOpacity
        style={loginDashboardStyles.button}
        onPress={() => routeToLogin()}>
        <Text style={loginDashboardStyles.loginText}> Login</Text>
      </TouchableOpacity>

      <Text
        style={loginDashboardStyles.linkText}
        onPress={() => routeToRegister()}>
        Sign Up
      </Text>
    </View>
  );
};

export default LoginDashboard;
