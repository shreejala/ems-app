import React from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Text} from "@rneui/themed";

const FollowButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.touchableButton}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowButton;
