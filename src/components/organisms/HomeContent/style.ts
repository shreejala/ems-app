import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const HomeContentStyles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
  },

  touchableContainer: {
    flexDirection: "row",
    flex: 1,
  },

  content: {marginLeft: 20, justifyContent: "center", gap: 10},

  contentText1: {color: "black", fontSize: 16},

  contentText2: {color: "gray", fontSize: 14},

  phoneContainer: {marginLeft: 20, justifyContent: "center"},

  inputContentStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },

  buttonStyle: {
    width: "40%",
    marginHorizontal: 20,
    marginBottom: 20,
  },

  placeholderStyle: {fontSize: 14},

  inputIconStyle: {padding: 5},

  flatListStyle: {paddingHorizontal: 12},

  listContentStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },

  emptyContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainerTextStyle: {fontSize: 24, color: Colors.gray500},
});

export default HomeContentStyles;
