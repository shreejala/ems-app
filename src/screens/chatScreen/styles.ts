import {StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";

const styles = StyleSheet.create({
  customInputToolBar: {
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.gray,
    borderTopColor: Colors.gray,
    paddingHorizontal: 10,
  },
  customSendStyle: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  mainContainerStyle: {
    flex: 1,
    marginBottom: 10,
  },
  customRightBubbleStyle: {
    backgroundColor: Colors.cyan500,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 5,
  },
  customLeftBubbleStyle: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default styles;
