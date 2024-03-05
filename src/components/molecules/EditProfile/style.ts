import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";
import {Platform} from "react-native";

const styles = StyleSheet.create({
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  experienceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: Colors.gray,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
    padding: 15,
    borderWidth: 0.9,
    borderColor: Colors.gray,
  },

  projectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  projectContent: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.9,
    borderColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
  },
  projectLabelStyle: {
    fontSize: 13,
    color: Colors.black,
    fontWeight: "600",
    marginHorizontal: 10,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -30,
    marginBottom: 15,
  },

  editProfileLabel: {
    fontWeight: "500",
    fontSize: 13,
  },

  descriptionInputStyle: {
    fontSize: 14,
  },

  descriptionInputField: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: -10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.gray,
  },

  descriptionMultilineStyle: {
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: -10,
    marginBottom: -5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.gray,
  },

  experienceContainer: {
    gap: 15,
  },

  experienceTextLabel: {
    fontSize: 13,

    color: Colors.black,
    flexWrap: "wrap",
    width: "90%",
  },
  deleteIcon: {
    position: "absolute",
    zIndex: 1,
    right: -5,
    top: -8,
  },
});

export default styles;
