import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    flex: 1,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
    gap: 10,
  },
  contentText1: {
    color: Colors.black,
    fontSize: 16,
  },
  contentText2: {
    color: "gray",
    fontSize: 14,
  },
  recentMessageText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default styles;
