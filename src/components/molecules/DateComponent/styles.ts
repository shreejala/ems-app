import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  statusText: {
    // fontFamily: "Fira Sans",
    fontSize: 15,
    color: "white",
    height: 19,
    textAlign: "center",
  },
  dayStyle: {
    fontSize: 20,
    color: "black",
    fontWeight: "600",
    height: 32,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.gray85,
  },
  yearStyle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
});
export default styles;
