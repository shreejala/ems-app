import {Platform, StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";

const leaveHistoryStyles = StyleSheet.create({
  wrapperContainer: {
    flexShrink: 0,
    alignContent: "center",
    borderColor: Colors.gray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    gap: 28,
    borderRadius: 30,
    marginBottom: 18,
    backgroundColor: Colors.white,

    ...Platform.select({
      ios: {
        shadowColor: Colors.white,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardComponent: {flexDirection: "row", gap: 12},
  topComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowDirection: {flexDirection: "row"},
  dateStyle: {color: "black", fontSize: 14},
  fullSpace: {flex: 1},
  infoWrapper: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  name: {
    color: "black",
    fontSize: 12,
    maxWidth: 112,
    fontWeight: "400",
    fontStyle: "italic",
    textAlignVertical: "center",
    marginHorizontal: 5,
  },
  adminActionPending: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    width: 97,
    height: 37,
    justifyContent: "space-around",
  },
  dividerVertical: {
    width: 1,
    height: 27,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
  },
  adminActionReject: {
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
  employeePending: {
    alignItems: "center",
    alignSelf: "flex-end",
  },
  employeeReject: {
    color: "black",
    textAlign: "left",
    marginTop: 10,
    fontSize: 12,
  },
  dividerHorizontal: {
    width: "100%",
    height: 1,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
  },
});
export default leaveHistoryStyles;
