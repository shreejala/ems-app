import React from "react";
import {View} from "react-native";
import registerStyles from "./styles";
import {AuthRoutes, AuthStackScreenProps} from "../../routes/types";
import RegisterForm from "../../components/organisms/RegisterContent/RegisterForm";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import useBiometrics from "../../hooks/useBiometrics";
import {handleSignUp} from "./helper";

const Register = ({navigation}: AuthStackScreenProps<AuthRoutes.Register>) => {
  const {biometricEnabled} = useBiometrics();
  const navigateToLogin = () => navigation.navigate(AuthRoutes.Login);

  const handlePress = async (data: any) => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available && biometryType === BiometryTypes.Biometrics) {
      rnBiometrics
        .simplePrompt({
          promptMessage: "Enable Biometric Login",
          cancelButtonText: "Cancel",
        })
        .then(async resultObject => {
          const {success} = resultObject;
          if (success) {
            await handleSignUp(data);
            await Keychain.setGenericPassword(data.email, data.password);
          } else {
            await handleSignUp(data);
          }
        });
    } else {
      await handleSignUp(data);
    }
  };

  return (
    <View style={registerStyles.container}>
      <RegisterForm
        navigateToLogin={navigateToLogin}
        handleSignUp={biometricEnabled ? handleSignUp : handlePress}
      />
    </View>
  );
};

export default Register;
