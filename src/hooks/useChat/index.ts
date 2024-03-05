import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import {useCallback, useEffect, useState} from "react";

import useAuthenticate from "../useAuthenticate";

import {
  ChatMessage,
  ConversationType,
  EmployeeUser,
  RecentMessage,
  UserConversation,
} from "../../constants/types";
import {GiftedChat} from "react-native-gifted-chat";
import {uploadImageToFirestore} from "../../utils/globalHelpers";
import {showToast} from "../../utils/showToast";

const useChat = () => {
  const [activeConversations, setActiveConversations] = useState<
    UserConversation[]
  >([]);
  const [isLoadingConversation, setisLoadingConversation] = useState(false);
  const [chatMessageId, setChatMessageId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [start, setStart] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetchingChat, setIsFetchingChat] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isRefreshingConversation, setIsRefreshingConversation] =
    useState(false);
  const [isLoadingUpdateChat, setIsLoadingUpdateChat] = useState(false);
  const [activeConvoDetails, setActiveConvoDetails] =
    useState<UserConversation | null>(null);
  const [activeConversationId, setActiveConversationId] = useState("");

  const user = useAuthenticate();

  const updateChatUsers = async (body: {
    conversationName: string;
    newMembers: Array<string>;
    chatId: string;
    prevMembers: Array<string>;
  }) => {
    setIsLoadingUpdateChat(true);
    try {
      const mergedMembers = [...(body?.prevMembers || []), ...body.newMembers];
      await firestore()
        .collection("Conversations")
        .doc(body?.chatId || "")
        .update({
          conversationName: body?.conversationName,
          members: mergedMembers,
        });

      body?.newMembers?.map(async id => {
        await firestore()
          .collection("UserConversations")
          .doc(id)
          .collection("conversations")
          .add({
            conversationId: body?.chatId || "",
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      });

      user?.uid && fetchActiveConversationById(body?.chatId, user.uid);
    } catch (e) {
      showToast({
        type: "error",
        text1: "Failed to change group settings.",
      });
    }
    setIsLoadingUpdateChat(false);
  };

  const addChatUsers = async (ids: Array<string>, conversationName: string) => {
    const newIds = [...ids, user?.uid];
    try {
      firestore()
        .collection("Conversations")
        .add({
          createdBy: user?.uid,
          conversationType:
            newIds?.length > 2
              ? ConversationType.Group
              : ConversationType.Individual,
          recentMessage: {},
          readBy: [user?.uid],
          conversationName,
          members: newIds,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(res => {
          newIds?.map(id => {
            firestore()
              .collection("UserConversations")
              .doc(id)
              .collection("conversations")
              .add({
                conversationId: res?.id,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });
          });
        });
    } catch (e) {
      console.log("error", e);
    }
  };

  const addChatMessages = async (payload, images) => {
    try {
      firestore()
        .collection("Chats")
        .doc(chatMessageId)
        .collection("messages")
        .add({
          ...payload,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(async res => {
          if (images?.length) {
            const downloadImgUrls = await Promise.all(
              images.map(
                async img =>
                  await uploadImageToFirestore(img, res.id, "chat_images"),
              ),
            );

            firestore()
              .collection("Chats")
              .doc(chatMessageId)
              .collection("messages")
              .doc(res.id)
              .update({
                image: downloadImgUrls,
              });
          }
          getTotalCount();
        });
    } catch (e) {
      console.log("error", e);
    }
  };

  const loadPreviousChats = async () => {
    setIsFetchingChat(true);
    const ref = firestore()
      .collection("Chats")
      .doc(chatMessageId)
      .collection("messages");

    ref
      .orderBy("createdAt", "desc")
      .startAfter(start)
      .limit(20)
      .onSnapshot(documentSnapshot => {
        const newStart =
          documentSnapshot.docs[documentSnapshot.docs.length - 1];
        setStart(newStart);

        const chatMessages = documentSnapshot.docs.map(doc => {
          return {
            ...(doc.data() as ChatMessage),
            createdAt: doc.data().createdAt?.toDate(),
          };
        });
        setMessages(prev => GiftedChat.prepend(prev, chatMessages));
      });
    setIsFetchingChat(false);
  };

  const getTotalCount = useCallback(async () => {
    if (chatMessageId && user?.uid) {
      const count = await firestore()
        .collection("Chats")
        .doc(chatMessageId)
        .collection("messages")
        .count()
        .get();

      setTotalCount(count.data().count);
    }
  }, [chatMessageId, user?.uid]);

  const updateActiveConversation = async (
    chatId: string,
    payload: {
      createdAt?: FirebaseFirestoreTypes.FieldValue;
      readBy?: Array<string>;
      recentMessage?: RecentMessage;
    },
  ) => {
    try {
      await firestore().collection("Conversations").doc(chatId).update(payload);
    } catch (e) {
      console.log("error", e);
    }
  };

  const refreshConversation = () => {
    setIsRefreshingConversation(true);
    user?.uid && fetchActiveConversation(user?.uid);
  };

  const fetchActiveConversationById = useCallback(
    (userConvoId: string, usrid: string) => {
      firestore()
        .collection("UserConversations")
        .doc(usrid)
        .collection("conversations")
        .where("conversationId", "==", userConvoId)
        .onSnapshot(async documentSnapshot => {
          const eachUserConvos: FirebaseFirestoreTypes.DocumentData =
            documentSnapshot?.docs?.[0];

          const conversationObj: FirebaseFirestoreTypes.DocumentData =
            await firestore()
              .collection("Conversations")
              .doc(userConvoId)
              .get();

          const members: EmployeeUser[] = await Promise.all(
            conversationObj?.data().members?.map(async (mem: string) => {
              const memObj: FirebaseFirestoreTypes.DocumentData =
                await firestore().collection("Users").doc(mem).get();
              return memObj.data();
            }),
          );

          const data = {
            ...eachUserConvos.data(),
            conversation: {...conversationObj.data(), members},
          };

          setActiveConvoDetails(data);
        });
    },
    [],
  );

  const fetchActiveConversation = useCallback(uid => {
    firestore()
      .collection("UserConversations")
      .doc(uid)
      .collection("conversations")
      .onSnapshot(async documentSnapshot => {
        const userConvos = await Promise.all(
          documentSnapshot.docs.map(async doc => {
            const data = doc.data() as UserConversation;

            const conversationObj: FirebaseFirestoreTypes.DocumentData =
              await firestore()
                .collection("Conversations")
                .doc(data?.conversationId)
                .get();

            const members: EmployeeUser[] = await Promise.all(
              conversationObj.data()?.members?.map(async (mem: string) => {
                const memObj: FirebaseFirestoreTypes.DocumentData =
                  await firestore().collection("Users").doc(mem).get();
                return memObj.data();
              }),
            );
            return {
              ...data,
              conversation: {...conversationObj.data(), members},
              createdAt: conversationObj.data().createdAt,
            };
          }),
        );

        const sorted = Object.values(userConvos).sort(
          (a, b) => b?.createdAt.toDate() - a?.createdAt.toDate(),
        );
        setisLoadingConversation(false);
        setActiveConversations(sorted);
        setIsRefreshingConversation(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingChat(true);
    const subscriber = firestore()
      .collection("Chats")
      .doc(chatMessageId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(20)
      .onSnapshot(async documentSnapshot => {
        const newStart =
          documentSnapshot.docs[documentSnapshot.docs.length - 1];
        setStart(newStart);

        const chatMessages = await Promise.all(
          documentSnapshot.docs.map(async doc => {
            const userObj = await firestore()
              .collection("Users")
              .doc(doc.data().user?._id)
              .get();

            return {
              ...(doc.data() as ChatMessage),
              user: {
                ...doc.data().user,
                name: userObj.data()?.name,
                avatar: userObj.data()?.profileImage,
              },
              createdAt: doc.data().createdAt?.toDate(),
            };
          }),
        );

        setMessages(GiftedChat.append([], chatMessages));
        setIsLoadingChat(false);
      });
    return () => subscriber();
  }, [chatMessageId, user?.uid]);

  useEffect(() => {
    if (activeConversationId && user?.uid) {
      fetchActiveConversationById(activeConversationId, user.uid);
    }
  }, [activeConversationId, user?.uid, fetchActiveConversationById]);

  useEffect(() => {
    if (user?.uid) {
      setisLoadingConversation(true);
      fetchActiveConversation(user.uid);
    }
  }, [user?.uid, fetchActiveConversation]);

  useEffect(() => {
    getTotalCount();
  }, [user?.uid, chatMessageId, getTotalCount]);

  return {
    addChatUsers,
    activeConversations,
    setChatMessageId,
    messages,
    setMessages,
    addChatMessages,
    loadPreviousChats,
    totalCount,
    isFetchingChat,
    updateActiveConversation,
    isLoadingConversation,
    isRefreshingConversation,
    refreshConversation,
    isLoadingChat,
    updateChatUsers,
    isLoadingUpdateChat,
    activeConvoDetails,
    setActiveConversationId,
  };
};

export default useChat;
