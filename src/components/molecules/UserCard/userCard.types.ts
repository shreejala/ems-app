import {TouchableOpacityProps, ViewStyle} from "react-native";

export interface UserCardProps extends TouchableOpacityProps {
  image: string | undefined;
  name?: string;
  position?: string;
  onPressCard: () => void;
  customTouchStyles?: ViewStyle;
}
