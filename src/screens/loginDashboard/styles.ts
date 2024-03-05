import {StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";
import {scheight, scwidth} from "../../utils/dimensions";
const loginDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleText: {
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
  },
  imageContainer: {
    height: scheight / 2.5,
    width: scwidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    height: 50,
    width: "80%",
    fontSize: 18,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.cyan500,
  },
  loginText: {
    fontSize: 18,
    color: Colors.white,
  },
  linkText: {
    fontSize: 18,
    color: Colors.gray500,
    textDecorationLine: "underline",
  },
});

export default loginDashboardStyles;
