import {StyleSheet} from "react-native";
import {Colors} from "../../../constants/colors";
import {Platform} from "react-native";
import {scwidth} from "../../../utils/dimensions";

const styles = StyleSheet.create({
  dashboardHeaderTextStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 20,
    marginLeft: 20,
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
  wfhMonthContainer: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  dashboardContentView: {
    marginBottom: 20,
  },
  textContainerStyle: {
    width: scwidth - 34,
    marginHorizontal: 17,
    borderRadius: 8,
  },

  textStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? 60 : 40,
  },

  monthText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },

  dateView: {
    borderWidth: 1,
    borderColor: Colors.lightRed,
    borderRadius: 5,
  },

  wfhDateView: {
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    borderRadius: 5,
  },

  dashboardTitleTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    marginVertical: 10,
  },

  leaveLabelTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    paddingHorizontal: 9,
  },
  leaveFlipCard: {
    height: 150,
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 20,
  },
  viewMoreTextStyle: {
    fontSize: 11,
    fontWeight: "bold",
    color: Colors.cyan500,
    marginTop: 25,
    marginHorizontal: 10,
  },

  cardContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginVertical: 10,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 16,
  },
  pressBtn: {
    width: 100,
    height: 50,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  leavesContentView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
  },
  leavesStyle: {
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 5,
  },
  flipIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
  },

  leaveCardContainer: {
    marginBottom: 20,
  },

  holidayCardContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },

  dashboardCard: {
    padding: 10,
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
  headerTextView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 25,
  },

  userActivityContainer: {
    paddingHorizontal: 9,
  },
  holidayContentContainer: {
    paddingHorizontal: 9,
  },
  scrollContentView: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default styles;
