import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView} from "react-native";
import {GiftedChat, Send} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/FontAwesome5";
import firestore from "@react-native-firebase/firestore";

import useChat from "../../hooks/useChat";
import useAuthenticate from "../../hooks/useAuthenticate";
import useProfile from "../../hooks/useProfile";
import useEmployeeInfo from "../../hooks/useEmployeeInfo";
import usePushNotify from "../../hooks/usePushNotify";

import {AppRoutes, AppStackScreenProps} from "../../routes/types";

import {getPushNotifiChatMsg, openFilePicker} from "./helper";
import {Colors} from "../../constants/colors";
import {ConversationType, EmployeeUser} from "../../constants/types";
import styles from "./styles";

import useCreateGoogleEvent from "../../hooks/useCreateGoogleEvent";
import {BottomSheetList, ListEmpty} from "../../components/molecules";
import {showToast} from "../../utils/showToast";
import {
  renderChatFooter,
  renderCustomActions,
  renderCustomEarlier,
  renderCustomInputToolBar,
  renderCustomMessageBubble,
} from "./components";

const ChatScreen = ({
  navigation,
  route,
}: AppStackScreenProps<AppRoutes.ChatScreen>) => {
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [file, setFile] = useState<string[]>([]);
  const [chatText, setChatText] = useState("");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [screenTitle, setScreenTitle] = useState("");

  const user = useAuthenticate();
  const {profileData} = useProfile();
  const {sendPushNotify} = usePushNotify();
  const {
    setChatMessageId,
    messages,
    setMessages,
    addChatMessages,
    loadPreviousChats,
    totalCount,
    isFetchingChat,
    updateActiveConversation,
    isLoadingChat,
    updateChatUsers,
    isLoadingUpdateChat,
    activeConvoDetails,
    setActiveConversationId,
  } = useChat();
  const {createGoogleMeet} = useCreateGoogleEvent();
  const {empData} = useEmployeeInfo();

  useEffect(() => {
    if (route?.params?.conversationId) {
      setActiveConversationId(route.params.conversationId);
    }
  }, [route]);

  const chatId = activeConvoDetails?.conversationId || "";
  const isChatGroup = activeConvoDetails?.conversation?.conversationType;
  const chatMembers = Array.isArray(activeConvoDetails?.conversation?.members)
    ? activeConvoDetails?.conversation?.members?.map(m => m.uid)
    : [];

  const filteredEmpData = empData.filter(
    item => !chatMembers.includes(item?.uid),
  );

  const userObject = {
    _id: user?.uid || 1,
  };

  const fcmTokens = activeConvoDetails?.conversation?.members
    ?.filter((mem: EmployeeUser) => mem?.uid !== user?.uid)
    .map((mem: EmployeeUser) => mem?.deviceToken);

  useEffect(() => {
    setLoadEarlier(totalCount > messages?.length);
  }, [totalCount, messages]);

  useEffect(() => {
    chatId && setChatMessageId(chatId);
  }, [chatId, setChatMessageId]);

  const toggleBottomSheet = useCallback(
    () => setIsSettingsVisible(!isSettingsVisible),
    [isSettingsVisible],
  );

  useEffect(() => {
    activeConvoDetails?.conversation?.conversationType ===
      ConversationType?.Group &&
      setScreenTitle(activeConvoDetails?.conversation?.conversationName || "");
  }, [activeConvoDetails]);

  useEffect(() => {
    isChatGroup === ConversationType.Group &&
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="ellipsis-v"
            size={20}
            onPress={toggleBottomSheet}
            color={Colors.black}
          />
        ),
        title: screenTitle,
      });
  }, [navigation, screenTitle, isChatGroup, toggleBottomSheet]);

  const handleOnSend = async msgArray => {
    if (user?.uid) {
      const msg = msgArray[0];

      const usermsg = {
        ...msg,
        sentBy: user?.uid,
        sentTo: chatId,
        createdAt: new Date(),
        image: file,
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, usermsg),
      );

      await addChatMessages(msg, file);

      const payload = {
        createdAt: firestore.FieldValue.serverTimestamp(),
        readBy: [user?.uid || ""],
        recentMessage: {
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderName: profileData?.name || "",
          messageText: file?.length ? "Sent a photo" : usermsg?.text || "",
        },
      };
      await updateActiveConversation(chatId, payload);

      const message = getPushNotifiChatMsg({
        fcmTokens,
        senderName: profileData?.name,
        chatMessage: usermsg?.text || "",
        chatInfo: activeConvoDetails,
      });

      sendPushNotify(message);

      setFile([]);
    }
  };

  const handleOpenFilePicker = async () => {
    try {
      const data = await openFilePicker();
      setFile(prevFile => {
        return [...prevFile, ...data];
      });
      setFile([data]);
    } catch (e: any) {
      showToast({
        type: "error",
        text1: e?.message || "Failed to select file",
      });
    }
  };

  const customSendPress = (text, onSend) => {
    if (!text && onSend && file?.length) {
      onSend({text: text.trim()}, true);
    } else if (text && onSend) {
      onSend({text: text.trim()}, true);
    } else {
      return false;
    }
  };

  const renderCustomSend = sendProps => (
    <Send
      {...sendProps}
      containerStyle={styles.customSendStyle}
      sendButtonProps={{
        onPress: () => customSendPress(sendProps.text, sendProps.onSend),
      }}>
      <Icon name="paper-plane" size={20} color={Colors.cyan500} solid />
    </Send>
  );

  const handleGoogleMeetPress = async () => {
    const response = await createGoogleMeet();
    setChatText(response?.data?.hangoutLink || "");
  };

  const options = {
    ["Image"]: async () => {
      handleOpenFilePicker();
    },
    ["Google Meet"]: async () => {
      handleGoogleMeetPress();
    },
    ["Cancel"]: () => {
      console.log("Cancel");
    },
  };

  const handleCheckPress = async (
    data: Array<string>,
    conversationName: string,
  ) => {
    toggleBottomSheet();

    const payload = {
      conversationName,
      newMembers: data,
      chatId,
      prevMembers: chatMembers,
    };

    updateChatUsers(payload);
  };

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      {isLoadingChat ? (
        <ListEmpty
          isLoading={isLoadingChat}
          emptyMessage="No conversations yet!"
        />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={handleOnSend}
          user={userObject}
          text={chatText}
          onInputTextChanged={text => setChatText(text)}
          showAvatarForEveryMessage
          loadEarlier={loadEarlier}
          onLoadEarlier={loadPreviousChats}
          isLoadingEarlier={isFetchingChat}
          listViewProps={{
            initialNumToRender: messages?.length === 0 ? 20 : messages?.length,
            showsVerticalScrollIndicator: false,
            maxToRenderPerBatch: 10,
          }}
          maxComposerHeight={100}
          renderInputToolbar={renderCustomInputToolBar}
          renderBubble={renderCustomMessageBubble}
          renderLoadEarlier={renderCustomEarlier}
          renderSend={renderCustomSend}
          renderActions={props => renderCustomActions(props, options)}
          renderChatFooter={() => renderChatFooter(file, setFile)}
          alwaysShowSend
          textInputStyle={{
            color: Colors.black,
          }}
        />
      )}

      <BottomSheetList
        isBottomSheetVisible={isSettingsVisible}
        onBackdropPress={toggleBottomSheet}
        data={filteredEmpData as EmployeeUser[]}
        onPressItem={handleCheckPress}
        chatName={screenTitle}
        isEditConversation
        isLoading={isLoadingUpdateChat}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
