import {Platform, StyleSheet} from "react-native";

import {Colors} from "../../constants/colors";

const EmployeeDetailStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lightCyan,
  },
  imageBgStyle: {
    flex: 1,
  },
  containerStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerContentStyle: {
    gap: 10,
    alignItems: "center",
  },
  empNameStyle: {
    fontSize: 44,
    color: "white",
    maxWidth: 350,
  },
  empSubtitleStyle: {fontSize: 25, color: "white"},
  secondContainerStyle: {
    position: "absolute",
    bottom: 0,
    height: "62%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  contactContainer: {flexDirection: "row", justifyContent: "space-around"},
  scrollStyle: {gap: 50},
  contentGap: {gap: 15},
  titleTextStyle: {
    fontSize: 24,
    marginTop: 30,
    color: Colors.black,
  },
  flatListStyle: {
    height: 150,
    width: "auto",
    gap: 20,
  },
  container: {
    marginLeft: 20,
    flexDirection: "row",
  },
  bulletPoint: {
    fontSize: 20,
    marginRight: 5,
    color: Colors.black,
  },
  box: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.black,
    lineHeight: 25,
  },
  chipStyle: {
    borderColor: Colors.darkGray,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 81,
    marginRight: 10,
  },
  projectContainer: {
    position: "relative",
    width: 158,
    borderRadius: 30,
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  projectText: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  projectPlaceholderStyle: {width: "50%", height: 200},
  content: {
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  animationAfterEffectView: {
    position: "absolute",
    top: Platform.OS === "ios" ? -90 : -85,
    left: Platform.OS === "ios" ? 30 : 15,
    flexDirection: "row",
  },
});
export default EmployeeDetailStyle;
