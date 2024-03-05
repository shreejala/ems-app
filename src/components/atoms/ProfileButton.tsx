import React from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {Text} from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";

type TouchableButtonProps = {
  onPress: () => void;
  type: string;
  color: string;
};

const ProfileButton = ({onPress, type, color}: TouchableButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{...styles.shareTouchableButton, backgroundColor: color}}>
        {type === "signout" ? (
          <Icon
            style={styles.shareIcon}
            name="logout"
            size={16}
            color={Colors.white}
          />
        ) : (
          <Text style={styles.buttonText}>Follow</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileButton;
