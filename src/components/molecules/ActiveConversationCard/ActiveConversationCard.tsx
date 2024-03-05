import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "@rneui/themed";

import styles from "./styles";
import {Colors} from "../../../constants/colors";
import {getNameInitialsFromName, getTime} from "../../../utils/globalHelpers";
import {ActiveConversationCardProps} from "./activeConversationCard.types";

const defaultAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

const ActiveConversationCard = ({
  image,
  name,
  position = "",
  onPressCard,
  customTouchStyles = {},
  isSelectable = false,
  time,
  recentMessageText,
  readBy,
  ...props
}: ActiveConversationCardProps) => {
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
    isSelectable && setIsChecked(!isChecked);
    onPressCard();
  };

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        {
          ...styles.touchableContainer,
          ...customTouchStyles,
          ...{
            backgroundColor: isChecked ? Colors.lightCyan : Colors.white,
          },
        },
      ])}
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
        <View style={{flexDirection: "row"}}>
          <View style={{flex: 0.75}}>
            <Text
              style={[
                styles.contentText1,
                {
                  fontWeight: readBy === false ? "600" : undefined,
                },
              ]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {name}
            </Text>
          </View>

          {time && (
            <View
              style={StyleSheet.flatten([
                {flex: 0.25, alignItems: "flex-end"},
              ])}>
              <Text
                style={{
                  color: Colors.black,
                }}>
                {getTime(time)}
              </Text>
            </View>
          )}
        </View>

        {position && <Text style={styles.contentText2}>{position}</Text>}

        <Text
          style={StyleSheet.flatten([
            styles.recentMessageText,
            {
              fontWeight: readBy === false ? "600" : undefined,
            },
          ])}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {recentMessageText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveConversationCard;
