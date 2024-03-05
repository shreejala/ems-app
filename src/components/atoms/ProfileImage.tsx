import {Image} from "@rneui/themed";
import React from "react";
import ImageShimmerEffect from "./ImageShimmerEffect";
import styles from "./styles";

const ProfileImage = ({profileImage}) => {
  return (
    <Image
      source={{
        uri: profileImage
          ? profileImage
          : "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
      }}
      containerStyle={styles.profileImage}
      PlaceholderContent={
        <ImageShimmerEffect height={110} width={110} borderRadius={50} />
      }
      placeholderStyle={styles.activityIndicatorStyle}
    />
  );
};

export default ProfileImage;
