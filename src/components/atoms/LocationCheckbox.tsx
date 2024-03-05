import React, {useState} from "react";
import {Text, View} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import {CheckBox} from "@rneui/base";
import styles from "./styles";
import {showToast} from "../../utils/showToast";

const LocationCheckbox = ({onLocationUpdate}) => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onCheckBoxPress = () => {
    Geolocation.getCurrentPosition(
      position => {
        setChecked(true);
        setDisabled(false);
        showToast({
          type: "success",
          text1: "Permission enabled",
        });

        onLocationUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      _ => {
        setChecked(false);
        setDisabled(true);
        showToast({
          type: "error",
          text1: "Permission not enabled",
        });
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View>
      <CheckBox
        checked={checked}
        size={20}
        containerStyle={styles.checkboxContainer}
        title={
          <Text style={styles.checkboxTitle}>
            Click here to enable location
          </Text>
        }
        onPress={() => onCheckBoxPress()}
      />
    </View>
  );
};

export default LocationCheckbox;
