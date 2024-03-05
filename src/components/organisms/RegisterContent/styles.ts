import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
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

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  registerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.cyan500,
  },

  registerSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
    color: "#B7B8B9",
  },

  registerForm: {
    display: "flex",
    marginVertical: 10,
  },

  registerLabel: {
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
    fontSize: 12,
  },

  signupText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  contentContainer: {
    marginTop: 30,
  },
});

export default styles;
