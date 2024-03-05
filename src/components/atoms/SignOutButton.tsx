import React from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import useAuthContext from "../../context/useAuthContext";
import {Colors} from "../../constants/colors";

const SignOutButton = () => {
  const [, actions] = useAuthContext();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          actions?.signOut();
        }}
        style={styles.shareTouchableButton}>
        <Icon
          style={styles.shareIcon}
          name="logout"
          size={16}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SignOutButton;
