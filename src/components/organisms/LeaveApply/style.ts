import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const leaveStyles = StyleSheet.create({
  leaveForm: {
    display: "flex",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  leaveLabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
  },

  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },

  inputStyle: {
    fontSize: 14,
  },
  dropDown: {
    height: 45,
    borderColor: Colors.gray,
  },
  dropDownPlaceholder: {
    color: Colors.silverGray,
    paddingLeft: 10,
  },
  dropdownContainerStyle: {
    marginVertical: 15,
  },
  dropdownListContainerStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
  },
});
export default leaveStyles;
