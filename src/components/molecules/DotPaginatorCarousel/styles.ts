import {Platform, StyleSheet} from "react-native";
import {scwidth} from "../../../utils/dimensions";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  imageContainerStyleL: {
    height: 157,
    width: scwidth - 34,
    marginHorizontal: 17,
    borderRadius: 8,
  },
  textContainerStyle: {
    height: 100,
    width: scwidth - 34,
    marginHorizontal: 17,
    borderRadius: 8,
  },

  textStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? 60 : 40,
  },

  descriptionStyle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 10,
  },

  carouselContainer: {},
});

export default styles;
