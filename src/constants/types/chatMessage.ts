import {IMessage} from "react-native-gifted-chat";

export interface ChatMessage extends IMessage {
  sentBy: string;
  sentTo: string;
}
