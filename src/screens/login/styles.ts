import {StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  fingerprintContainer: {
    color: "black",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fingerprintText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 5,
  },

  loginButtonStyle: {
    borderRadius: 8,
  },

  titleText: {
    color: "#000000",
    fontSize: 20,
  },
  button: {
    height: 40,
    width: 150,
    backgroundColor: "pink",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  loginHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.cyan500,
  },

  loginSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
    color: "#B7B8B9",
  },

  loginForm: {
    display: "flex",
    marginVertical: 10,
  },

  loginLabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },

  inputField: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginHorizontal: -10,
  },

  inputStyle: {
    fontSize: 14,
  },

  forgotPasswordStyle: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  footerContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
  },

  signupSubtitle: {
    color: "black",
    fontSize: 12,
  },

  signupText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  contentContainer: {
    marginTop: 80,
  },
});

export default loginStyles;
