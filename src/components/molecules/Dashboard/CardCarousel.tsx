import React, {useRef} from "react";
import {Animated, FlatList, View} from "react-native";
import {scwidth} from "../../../utils/dimensions";
import DotPaginator from "../DotPaginatorCarousel/DotPaginator";
import styles from "../DotPaginatorCarousel/styles";
import CardComponent from "./CardComponent";

interface DotPaginatorCarouselProps {
  data: Array<object>;
}
const CardCarousel = ({data}: DotPaginatorCarouselProps) => {
  const carouselRef = useRef<null | FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({item}: {item: any}) => {
    return <CardComponent data={item} />;
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
        // onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <DotPaginator data={data} scrollX={scrollX} />
    </View>
  );
};

export default CardCarousel;
