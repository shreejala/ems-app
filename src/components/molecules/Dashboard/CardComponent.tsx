import {Text} from "@rneui/themed";
import React from "react";
import {View} from "react-native";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateComponent from "../DateComponent";
import LeaveChip from "../../atoms/LeaveChip";
import {Colors} from "../../../constants/colors";

type CardComponent = {
  data: Array<object>;
};

const CardComponent = ({data}) => {
  const {date, leaveData, wfhData} = data;
  const rotationF = useSharedValue(0);
  const rotationB = useSharedValue(180);

  const frontStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotationF.value}deg`}],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotationB.value}deg`}],
    };
  });

  const onAnimate = () => {
    "worklet";
    if (rotationF.value === 180) {
      rotationF.value = withTiming(0, {duration: 500});
      rotationB.value = withTiming(180, {duration: 500});
      return;
    }
    rotationF.value = withTiming(180, {duration: 500});
    rotationB.value = withTiming(360, {duration: 500});
  };
  const animate = () => {
    runOnUI(onAnimate)();
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[frontStyle, styles.card]}>
        <View style={[styles.frontCard, styles.dashboardCard]}>
          <DateComponent status="leave" createdDate={formattedDate} />
          <View style={styles.leavesContentView}>
            {leaveData.length > 0 ? (
              leaveData.map((leave, index) => (
                <LeaveChip key={index} index={index} leave={leave} />
              ))
            ) : (
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>No leaves today</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
      <Animated.View style={[backStyle, styles.card]}>
        <View style={[styles.backCard, styles.dashboardCard]}>
          <DateComponent status="work from home" createdDate={formattedDate} />
          <View style={styles.leavesContentView}>
            {wfhData.length > 0 ? (
              wfhData
                .slice(0, 5)
                .map((leave, index) => (
                  <LeaveChip key={index} index={index} leave={leave} />
                ))
            ) : (
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>No work from home today</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
      <View style={styles.flipIconContainer}>
        <Icon name="sync" onPress={animate} size={14} color={Colors.black} />
      </View>
    </View>
  );
};

export default CardComponent;
