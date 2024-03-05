import {
  ConversationType,
  EmployeeUser,
  UserConversation,
} from "../../constants/types";

export const getChatName = (
  info: UserConversation,
  userId: string | undefined,
) => {
  let name: string;
  if (info?.conversation?.conversationType === ConversationType?.Group) {
    name = info?.conversation?.conversationName || "Group";
  } else {
    const chatUser = info?.conversation?.members?.filter(
      mem => mem?.uid !== userId,
    );
    name = chatUser?.[0]?.name || "";
  }
  return name;
};

export const getConversationName = (
  data: UserConversation,
  uid: string | undefined,
) => {
  switch (data?.conversation?.conversationType) {
    case ConversationType.Group:
      return (
        data?.conversation?.conversationName ||
        data?.conversation?.members
          ?.map((mem: EmployeeUser) => mem?.name || "")
          .join(" ")
      );
    case ConversationType.Individual: {
      const chatUser = data?.conversation?.members?.filter(
        (mem: EmployeeUser) => mem?.uid !== uid,
      );
      return chatUser?.[0]?.name || "";
    }
    default:
      return "";
  }
};

export const getConversationAvatar = (
  data: UserConversation,
  uid: string | undefined,
) => {
  switch (data?.conversation?.conversationType) {
    case ConversationType.Group:
      return "";
    case ConversationType.Individual: {
      const chatUser = data?.conversation?.members?.filter(
        (mem: EmployeeUser) => mem?.uid !== uid,
      );
      return chatUser?.[0]?.profileImage || "";
    }
    default:
      return "";
  }
};
