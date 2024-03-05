import {StyleSheet} from "react-native";

import {scheight} from "../../../utils/dimensions";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  listContainer: {
    height: scheight * (85 / 100),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  checkButtonStyle: {
    flex: 0.13,
    backgroundColor: Colors.cyan500,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  userCardStyle: {
    padding: 10,
    borderRadius: 10,
    shadowColor: Colors.gray,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    padding: 15,
  },
  inputStyle: {
    fontSize: 14,
  },
  addParticipantsStyle: {
    marginBottom: 15,
  },
  addTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  addButtonStyle: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: Colors.cyan500,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default styles;
