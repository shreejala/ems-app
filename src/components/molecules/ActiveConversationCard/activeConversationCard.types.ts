import {TouchableOpacityProps, ViewStyle} from "react-native";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

export interface ActiveConversationCardProps extends TouchableOpacityProps {
  image: string | undefined;
  name?: string;
  position?: string;
  onPressCard: () => void;
  customTouchStyles?: ViewStyle;
  isSelectable?: boolean;
  time?: FirebaseFirestoreTypes.Timestamp;
  recentMessageText?: string;
  readBy?: boolean;
  showRecentMessageText?: boolean;
}
