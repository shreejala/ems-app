import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  editProfileContent: {
    marginVertical: 20,
  },

  editProfileLabel: {
    fontWeight: "500",
    fontSize: 13,
  },
  descriptionInputStyle: {
    fontSize: 14,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -30,
    marginBottom: 15,
  },

  descriptionInputField: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: -10,
    marginBottom: -10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.gray,
  },
  focusedInputStyle: {
    borderColor: Colors.blue400,
  },

  editProfileContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  experienceContainer: {
    marginVertical: 20,
  },
});

export default styles;
