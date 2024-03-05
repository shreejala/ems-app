import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";
import {Platform} from "react-native";

const styles = StyleSheet.create({
  userInfoContainer: {
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
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  profileDetailsWrapper: {
    marginVertical: 10,
    marginBottom: 30,
  },

  profileDetailsContent: {
    marginVertical: 10,
  },

  profileImageContainer: {
    width: "100%",
    flex: 1,
  },
  linkedInIcon: {
    marginTop: 5,
  },

  imageStyle: {
    width: "100%",
    height: "100%",
  },

  addIconStyle: {
    color: Colors.darkGray,
  },

  imageContainer: {
    padding: 10,
  },
  userProfileContent: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  usernameStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  jobTitle: {
    fontWeight: "600",
    color: Colors.gray600,
    fontSize: 14,
  },

  addJobTitle: {
    marginTop: 5,
    fontWeight: "700",
    color: Colors.blue400,
    fontSize: 13,
  },

  addAboutStyle: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addDescriptionTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkGray,
    marginLeft: 10,
  },

  infoContent: {
    marginVertical: 30,
    marginHorizontal: 20,
    alignItems: "center",
  },
  infoHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoLabel: {
    fontWeight: "600",
    color: "#C6C8D8",
    fontSize: 14,
    marginTop: 10,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageShimmerEffect: {width: "50%", height: 200},

  profileDetailsContainer: {
    marginVertical: 20,
    flex: 1,
    marginHorizontal: 10,
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
  },
});

export default styles;
