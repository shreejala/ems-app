import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";
import {Platform} from "react-native";
import {scwidth} from "../../../utils/dimensions";

const styles = StyleSheet.create({
  cardContainer: {
    width: scwidth - 40,
    height: 90,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  leaveContent: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: -5,
  },

  dashboardViewStyle: {
    height: "25%",
    backgroundColor: Colors.cyan500,
    overflow: "visible",
    marginBottom: 40,
  },
  curvedLine: {
    width: "20%",
    height: 130,
    position: "absolute",
    bottom: -40,
    left: "40%",
    borderBottomLeftRadius: 30,
    // borderBottomRightRadius: -10,
    backgroundColor: Colors.cyan500,
    transform: [{scaleX: 5}, {scaleY: 1}],
  },
  leavesContentView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
    flex: 1,
    marginLeft: 10,
    marginTop: -5,
  },

  outwardCurve: {
    width: "100%",
    height: 40,
    position: "absolute",
    bottom: -39,
    right: 0,
    backgroundColor: Colors.cyan500,
  },
  backCard: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  flipIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  inwardCurve: {
    width: "100%",
    height: 70,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    zIndex: 1,
  },
  dashboardContentStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  wfhDateView: {
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    borderRadius: 5,
  },
  wfhMonthContainer: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  dateView: {
    borderWidth: 1,
    borderColor: Colors.lightRed,
    borderRadius: 5,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    paddingTop: 7,
  },

  monthContainer: {
    backgroundColor: Colors.lightRed,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  frontCard: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 16,
    paddingHorizontal: 10,
    // marginHorizontal: 10,
  },
  contentStyle: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  checkInCheckOutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 25,
  },

  labelTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.cyan500,
  },

  checkInTimeStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.green,
  },

  checkOutTimeStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.lightRed,
    marginLeft: -12,
  },
  inputField: {
    marginHorizontal: -10,
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: "500",
  },
  noDataText: {
    marginLeft: 20,
    fontWeight: "600",
    color: Colors.silverGray,
  },
  noDataTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dashboardCard: {
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
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
});

export default styles;
