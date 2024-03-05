import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const styles = StyleSheet.create({
  editProfileDetailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  editProfileDetailsForm: {
    width: "100%",
    // alignItems: "center",
  },
  fingerprintText: {
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: Colors.blue400,
  },
  editProfileDescriptionLabel: {
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  editProfileDetailsInputContent: {
    marginVertical: 20,
    width: "100%",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  bottomContentStyle: {},

  activityIndicatorStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  fingerprintContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  usernameInputStyle: {
    fontSize: 14,
  },

  usernameInputField: {
    height: 40,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: -10,
    width: "100%",
  },

  urlInputField: {
    // height: 40,
    // padding: 10,
    marginVertical: 10,
    marginHorizontal: -10,
    width: "100%",
  },
  focusedInputStyle: {
    borderColor: Colors.blue400,
  },

  editProfileContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default styles;
