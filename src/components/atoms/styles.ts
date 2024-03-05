import {StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";

const styles = StyleSheet.create({
  loginButtonStyle: {
    borderRadius: 8,
  },
  infoFieldStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  infoFieldText: {
    fontSize: 13,
    fontWeight: "500",
  },
  infoFieldLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  addIconStyle: {
    color: Colors.darkGray,
  },
  touchableButton: {
    borderRadius: 20,
    backgroundColor: Colors.blue400,
  },

  inputStyle: {
    fontSize: 14,
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

  qrCodeStyle: {
    marginRight: 10,
  },

  qrContent: {
    flexDirection: "row",
    marginTop: 10,
  },
  skillContent: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray600,
  },

  skillText: {
    color: Colors.gray600,
    fontWeight: "500",
  },

  shareTouchableButton: {
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 25,
    fontWeight: "500",
  },
  shareIcon: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  checkboxTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },
  checkboxContainer: {
    paddingHorizontal: 0,
  },
  activityIndicatorStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  avatarStyle: {
    backgroundColor: Colors.cyan500,
    borderRadius: 10,
  },

  imageShimmerEffect: {width: "50%", height: 200},
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  bottomSheetContentStyle: {
    padding: 20,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
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
});

export default styles;
