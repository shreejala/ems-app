import React from "react";
import {View, Animated, StyleSheet} from "react-native";
import {scwidth} from "../../../utils/dimensions";
import {Colors} from "../../../constants/colors";

const dotSize = 8;
const selectedDotSize = 24;

interface DotPaginatorProps {
  data: Array<object>;
  scrollX: Animated.Value;
}

const styles = StyleSheet.create({
  dotContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dotStyle: {
    height: dotSize,
    borderRadius: dotSize / 2,
    marginHorizontal: 2,
    marginTop: 5,
  },
});

const DotPaginator = ({data, scrollX}: DotPaginatorProps) => {
  return (
    <View style={styles.dotContainer}>
      {data.map((_: any, index: number) => {
        const inputRange = [
          (index - 1) * scwidth,
          index * scwidth,
          (index + 1) * scwidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [dotSize, selectedDotSize, dotSize],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.gray500, Colors.white, Colors.gray500],
          extrapolate: "clamp",
        });

        const dot = {
          width: dotWidth,
          backgroundColor,
        };

        return (
          <Animated.View
            key={`${index}`}
            style={StyleSheet.flatten([styles.dotStyle, dot])}
          />
        );
      })}
    </View>
  );
};

export default DotPaginator;
