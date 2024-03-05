import {StyleSheet} from "react-native";
import {Colors} from "../constants/colors";

const tabStyles = StyleSheet.create({
  container: {width: "100%", height: "100%", backgroundColor: "white"},
  tabBar: {
    backgroundColor: "#ffffff",
  },
  indicatorStyle: {
    backgroundColor: Colors.cyan500,
    padding: 1.5,
    marginBottom: -2,
  },
});
export default tabStyles;
