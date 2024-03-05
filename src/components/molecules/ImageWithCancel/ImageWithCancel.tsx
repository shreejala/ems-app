import React from "react";
import {ImageBackground, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Touch from "../../atoms/Touch";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  imageContainerStyle: {
    height: 100,
    width: 100,
    marginLeft: 10,
    opacity: 0.9,
    padding: 5,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
  },
  crossIcon: {
    alignSelf: "flex-end",
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 25 / 2,
  },
});

const ImageWithCancel = ({uri, onDelete}) => {
  return (
    <ImageBackground style={styles.imageContainerStyle} source={{uri}}>
      <Touch onPress={onDelete} style={styles.crossIcon}>
        <Icon name="times" size={15} color={Colors.white} />
      </Touch>
    </ImageBackground>
  );
};
export default ImageWithCancel;
