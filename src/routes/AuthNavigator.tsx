import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthRoutes, AuthStackParamList} from "./types";
import {Login, LoginDashboard} from "../screens";
import {Register} from "../screens/register";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name={AuthRoutes.LoginDashboard}
        component={LoginDashboard}
      />

      <AuthStack.Screen name={AuthRoutes.Login} component={Login} />
      <AuthStack.Screen name={AuthRoutes.Register} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
