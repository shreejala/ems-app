import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {EmployeeUser} from "./user";

export interface UserConversation {
  conversationId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  conversation: Conversation;
}

export interface Conversation {
  createdBy: string;
  conversationType: ConversationType;
  recentMessage: RecentMessage;
  readBy: Array<string>;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  conversationName?: string;
  members: EmployeeUser[];
}

export interface RecentMessage {
  createdAt: FirebaseFirestoreTypes.FieldValue;
  messageText: string;
  senderName: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export enum ConversationType {
  Group = "group",
  Individual = "individual",
}
