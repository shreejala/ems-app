import {
  Animated,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Avatar} from "@rneui/themed";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import ImageShimmerEffect from "../../../components/atoms/ImageShimmerEffect";

import EmployeeDetailStyle from "../style";
import {getNameInitialsFromName} from "../../../utils/globalHelpers";
import {Colors} from "../../../constants/colors";

const animatedImageHeight = 400;
const defaultAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

interface AnimatedBackgroundImageProps {
  scrollY: any;
  avatar?: string;
  avatarTitle?: string;
  avatarSubTitle?: string;
}

const ImageComponent = ({
  scrollY,
  avatar,
  avatarTitle,
  avatarSubTitle,
}: AnimatedBackgroundImageProps) => {
  const insets = useSafeAreaInsets();

  const AnimtedBackgroundImage =
    Animated.createAnimatedComponent(ImageBackground);

  const screenPercent = Platform.OS === "ios" ? 76 : 68;
  const afterAnimatedHeight =
    animatedImageHeight * (screenPercent / 100) - insets?.top;

  const translateHeader = scrollY.interpolate({
    inputRange: [0, afterAnimatedHeight],
    outputRange: [0, -afterAnimatedHeight],
    extrapolate: "clamp",
  });

  const avatarOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const conditionalAvatarTitle =
    !avatar && getNameInitialsFromName(avatarTitle) !== ""
      ? getNameInitialsFromName(avatarTitle)
      : undefined;

  const conditionalAvatarImage = avatar
    ? {uri: avatar}
    : getNameInitialsFromName(avatarTitle) === ""
      ? {uri: defaultAvatar}
      : undefined;

  return (
    <AnimtedBackgroundImage
      style={StyleSheet.flatten([
        EmployeeDetailStyle.header,
        {
          transform: [{translateY: translateHeader}],
          height: animatedImageHeight,
        },
      ])}
      source={require("../../../assets/teampic.jpg")}
      blurRadius={3}>
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.2)",
          "rgba(0, 0, 0, 0.3)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.7)",
        ]}>
        <View style={EmployeeDetailStyle.containerStyle}>
          <Animated.View
            style={[
              {
                opacity: avatarOpacity,
                alignItems: "center",
              },
            ]}>
            <Avatar
              size={120}
              rounded
              title={conditionalAvatarTitle}
              source={conditionalAvatarImage}
              containerStyle={{backgroundColor: Colors.cyan500}}
              imageProps={{
                PlaceholderContent: (
                  <ImageShimmerEffect
                    width={120}
                    height={120}
                    borderRadius={500}
                  />
                ),
              }}
            />

            <View style={EmployeeDetailStyle.containerContentStyle}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={EmployeeDetailStyle.empNameStyle}>
                {avatarTitle}
              </Text>

              <Text style={EmployeeDetailStyle.empSubtitleStyle}>
                {avatarSubTitle}
              </Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View
          style={{
            opacity: Animated.subtract(1, avatarOpacity),
          }}>
          <View style={EmployeeDetailStyle.animationAfterEffectView}>
            <Avatar
              size={70}
              rounded
              title={conditionalAvatarTitle}
              source={conditionalAvatarImage}
              containerStyle={{backgroundColor: Colors.cyan500}}
              imageProps={{
                PlaceholderContent: (
                  <ImageShimmerEffect
                    width={120}
                    height={120}
                    borderRadius={500}
                  />
                ),
              }}
            />
            <View style={{marginLeft: 10, justifyContent: "center", gap: 5}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[EmployeeDetailStyle.empNameStyle, {fontSize: 25}]}>
                {avatarTitle}
              </Text>

              <Text
                style={[EmployeeDetailStyle.empSubtitleStyle, {fontSize: 15}]}>
                {avatarSubTitle}
              </Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </AnimtedBackgroundImage>
  );
};

export default ImageComponent;
