import React from "react";
import {View} from "react-native";
import styles from "./styles";
import {SafeAreaView} from "react-native-safe-area-context";

const DashboardHeaderLayout = ({children}) => {
  return (
    <View style={styles.dashboardViewStyle}>
      <View style={styles.curvedLine}>
        <View style={styles.outwardCurve}>
          <View style={styles.inwardCurve} />
        </View>
      </View>
      <SafeAreaView style={styles.dashboardContentStyle}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export default DashboardHeaderLayout;
