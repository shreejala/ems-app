import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "@rneui/themed";

import styles from "./styles";
import {Colors} from "../../../constants/colors";
import {getNameInitialsFromName} from "../../../utils/globalHelpers";
import {scwidth} from "../../../utils/dimensions";
import {UserCardProps} from "./userCard.types";

const defaultAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

const UserCard = ({
  image,
  name,
  position = "",
  onPressCard,
  customTouchStyles = {},
  ...props
}: UserCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const conditionalAvatarTitle =
    !image && getNameInitialsFromName(name) !== ""
      ? getNameInitialsFromName(name)
      : undefined;

  const conditionalAvatarImage = image
    ? {uri: image}
    : getNameInitialsFromName(name) === ""
      ? {uri: defaultAvatar}
      : undefined;

  const handleTouch = () => {
    setIsChecked(!isChecked);
    onPressCard();
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.touchableContainer,
        ...customTouchStyles,
      }}
      onPress={handleTouch}
      {...props}>
      <Avatar
        rounded
        size={65}
        source={conditionalAvatarImage}
        title={conditionalAvatarTitle}
        containerStyle={{backgroundColor: Colors.cyan500}}
      />

      <View style={styles.content}>
        <Text
          style={[styles.contentText1, {width: scwidth * (70 / 100)}]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {name}
        </Text>

        {position && <Text style={styles.contentText2}>{position}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
