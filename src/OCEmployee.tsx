import React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";

import {Colors} from "./constants/colors";
import AuthNavigator from "./routes/AuthNavigator";
import {AppNavigator} from "./routes";
import useAuthenticate from "./hooks/useAuthenticate";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

const OCEmployee = () => {
  const user = useAuthenticate();

  return (
    <NavigationContainer theme={AppTheme}>
      {user ? (
        <AppNavigator />
      ) : (
        <SafeAreaView style={styles.mainContainer}>
          <AuthNavigator />
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
};

export default OCEmployee;
