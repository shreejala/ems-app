import React, {useEffect, useRef, useState} from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import {Image} from "@rneui/base";

import DotPaginator from "./DotPaginator";

import styles from "./styles";
import {scwidth} from "../../../utils/dimensions";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {Text} from "@rneui/themed";

interface DotPaginatorCarouselProps {
  data: Array<object>;
  renderItem: any;
}
let autoSwapTimer: ReturnType<typeof setTimeout> | undefined;
const DotPaginatorCarousel = ({
  data,
  renderItem,
}: DotPaginatorCarouselProps) => {
  const carouselRef = useRef<null | FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSwipe, setAutoSwipe] = useState(true);
  const [timeStamp, setTimeStamp] = useState(Date.now());

  const changeAutoSwipeState = () => {
    setAutoSwipe(false);
    if (autoSwapTimer) {
      clearTimeout(autoSwapTimer);
    }
    autoSwapTimer = setTimeout(() => {
      setAutoSwipe(true);
    }, 2000);
  };

  // can be optimized later
  useEffect(() => {
    const autoScroll = () => {
      if (currentIndex >= data?.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
      }
    };

    if (autoSwipe) {
      carouselRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });

      const timer = setInterval(() => {
        setTimeStamp(Date.now());

        autoScroll();
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [autoSwipe, currentIndex, data?.length]);

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffset = e?.nativeEvent?.contentOffset;
    const viewSize = e?.nativeEvent?.layoutMeasurement;

    const pageNum = Math.floor(contentOffset?.x / viewSize?.width);

    if (Math.floor((Date.now() - timeStamp) / 1000) > 0) {
      changeAutoSwipeState();
      setCurrentIndex(pageNum);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={carouselRef}
        getItemLayout={(_, index) => ({
          length: scwidth,
          offset: scwidth * index,
          index,
        })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => `${index}${item.imgUri}`}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <DotPaginator data={data} scrollX={scrollX} />
    </View>
  );
};

export default DotPaginatorCarousel;
