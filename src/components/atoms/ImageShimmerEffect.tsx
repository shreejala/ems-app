import React from "react";
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

type imageShimmerProps = {
  height?: number;
  width?: number;
  borderRadius?: number;
};

const ImageShimmerEffect = ({height, width}: imageShimmerProps) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return <ShimmerPlaceHolder style={{height, width}} />;
};

export default ImageShimmerEffect;
