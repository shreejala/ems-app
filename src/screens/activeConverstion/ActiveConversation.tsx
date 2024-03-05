import React, {useState} from "react";
import {FlatList, RefreshControl, View} from "react-native";
import {FAB, Divider} from "@rneui/themed";

import useEmployeeInfo from "../../hooks/useEmployeeInfo";
import useChat from "../../hooks/useChat";
import useAuthenticate from "../../hooks/useAuthenticate";
import {
  ActiveConversationCard,
  ListEmpty,
  BottomSheetList,
} from "../../components/molecules";

import {
  getChatName,
  getConversationAvatar,
  getConversationName,
} from "./helper";
import {AppRoutes} from "../../routes/types";
import {EmployeeUser, UserConversation} from "../../constants/types";
import {Colors} from "../../constants/colors";

const ActiveConversation = ({navigation}) => {
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const {empData} = useEmployeeInfo();
  const {
    addChatUsers,
    activeConversations,
    updateActiveConversation,
    isLoadingConversation,
    isRefreshingConversation,
    refreshConversation,
  } = useChat();
  const user = useAuthenticate();

  const toggleBottomSheet = () => setIsUserListVisible(!isUserListVisible);

  const handleItemPress = (data: Array<string>, conversationName: string) => {
    toggleBottomSheet();

    if (data?.length === 1) {
      const uniqueUser = activeConversations?.filter(ac => {
        return (
          ac?.conversation?.members?.length === 2 &&
          ac?.conversation?.members?.some(mem => mem?.uid === data[0])
        );
      });

      if (uniqueUser?.length === 0) {
        addChatUsers(data, conversationName);
      }
    } else {
      addChatUsers(data, conversationName);
    }
  };

  const handleOnClickChat = async (item: UserConversation) => {
    const chatScreenName = getChatName(item, user?.uid);
    const readBy = [...(item?.conversation?.readBy || [])];
    const foundIndex = readBy?.indexOf(user?.uid || "");
    if (foundIndex < 0) {
      readBy.push(user?.uid || "");
    }
    const payload = {
      readBy,
    };

    await updateActiveConversation(item?.conversationId, payload);

    navigation.navigate(AppRoutes.ChatScreen, {
      conversationId: item?.conversationId,
      chatScreenName,
    });
  };

  const renderItem = ({item, index}) => {
    const {readBy, recentMessage, createdAt} = item?.conversation || {};
    return (
      <>
        <ActiveConversationCard
          image={getConversationAvatar(item, user?.uid)}
          name={getConversationName(item, user?.uid)}
          onPressCard={() => handleOnClickChat(item)}
          time={recentMessage?.createdAt || createdAt}
          recentMessageText={recentMessage?.messageText}
          readBy={
            Array.isArray(readBy) &&
            readBy?.some((id: string) => id === user?.uid)
          }
        />

        {index < activeConversations?.length - 1 && (
          <Divider style={{marginVertical: 10}} />
        )}
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoadingConversation || activeConversations?.length === 0 ? (
        <ListEmpty
          isLoading={isLoadingConversation}
          emptyMessage="No conversations yet!"
        />
      ) : (
        <FlatList
          contentContainerStyle={{padding: 10}}
          showsVerticalScrollIndicator={false}
          data={activeConversations}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item?.conversationId}${index}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshingConversation}
              onRefresh={refreshConversation}
            />
          }
        />
      )}

      <BottomSheetList
        onBackdropPress={toggleBottomSheet}
        data={empData as EmployeeUser[]}
        onPressItem={handleItemPress}
        isBottomSheetVisible={isUserListVisible}
      />

      <FAB
        visible
        icon={{name: "search", color: "white"}}
        size="large"
        placement="right"
        color={Colors.cyan500}
        onPress={() => setIsUserListVisible(true)}
      />
    </View>
  );
};

export default ActiveConversation;
