import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";
import {Platform} from "react-native";

const styles = StyleSheet.create({
  profileContentContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
  },

  profileDetailsWrapper: {
    marginVertical: 15,
  },

  contentWrapper: {
    marginBottom: 30,
  },

  descriptionTextStyle: {
    fontSize: 13,
  },
  profileDetailsSpacingStyle: {
    marginVertical: 10,
  },

  qrStyle: {
    borderRadius: 50,
    borderColor: Colors.cyan500,
    borderWidth: 2,
    padding: 10,
    width: 60,
    marginVertical: 10,
    alignSelf: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    zIndex: 20,
    backgroundColor: "white",
  },

  profileDetailsContent: {
    // marginVertical: 10,
  },

  profileDetailsLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  profileDetailsDescriptionLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },

  descriptionStyles: {
    padding: 20,
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
    borderWidth: 0.9,
    borderColor: Colors.gray,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 10,
  },
  userProfileContent: {
    marginHorizontal: 25,
    marginVertical: 10,
  },

  usernameStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  usernameDescription: {
    marginTop: 5,
    fontWeight: "600",
    color: "#C6C8D8",
    fontSize: 14,
  },
  followButton: {
    backgroundColor: "#3B73FF",
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
});

export default styles;
