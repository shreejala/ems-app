import React, {useEffect, useState} from "react";
import {BottomSheet, BottomSheetProps} from "@rneui/themed";
import {ScrollView, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import {UserCard} from "../UserCard";
import styles from "./styles";
import SearchComponent from "../../atoms/SearchComponent";
import {Colors} from "../../../constants/colors";
import Touch from "../../atoms/Touch";
import {EmployeeUser} from "../../../constants/types/user";
import InputFieldWithError from "../../atoms/InputFieldWithError";

interface BottomSheetListProps extends BottomSheetProps {
  data: EmployeeUser[];
  onPressItem: (selected: Array<string>, conversationName: string) => void;
  isEditConversation?: boolean;
  chatName?: string;
  onBackdropPress: () => void;
  isBottomSheetVisible: boolean;
  isLoading?: boolean;
}

const BottomSheetList = ({
  data = [],
  onPressItem,
  isEditConversation = false,
  chatName = "",
  onBackdropPress,
  isBottomSheetVisible,
  isLoading = false,
  ...props
}: BottomSheetListProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchedList, setSearchedList] = useState<EmployeeUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [conversationName, setConversationName] = useState(chatName);
  const [errorMsg, setErrMsg] = useState<string | undefined>(undefined);

  useEffect(() => {
    chatName && setConversationName(chatName);
  }, [isBottomSheetVisible, chatName]);

  const handleOnChangeSearchText = (value: string) => {
    setSearchText(value);

    const matchingEmployee = data?.filter((item: EmployeeUser) => {
      const name = (item?.name as string) ?? "";
      const compareTo = typeof value === "string" ? value.toLowerCase() : "";
      return name.toLowerCase().includes(compareTo);
    });
    setSearchedList(matchingEmployee);
  };

  const listData: EmployeeUser[] = searchText ? searchedList : data;

  const handleCardPress = (usr: EmployeeUser) => {
    const newSelectedUsers = [...selectedUsers];
    const foundIndex = selectedUsers?.findIndex(uid => uid === usr?.uid);
    if (foundIndex >= 0) {
      newSelectedUsers.splice(foundIndex, 1);
    } else {
      newSelectedUsers.push(usr?.uid);
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handleCheckPress = () => {
    if (
      (selectedUsers?.length > 1 && conversationName === "") ||
      (isEditConversation && conversationName === "")
    ) {
      setErrMsg("Required");
    } else if (isEditConversation || selectedUsers?.length) {
      onPressItem(selectedUsers, conversationName);
      resetState();
    }
  };

  const handleOnChangeText = (text: string) => {
    setConversationName(text);
    setErrMsg(undefined);
  };

  const isConversationNameInputVisible = selectedUsers?.length > 1 || chatName;

  const resetState = () => {
    setSelectedUsers([]);
    setConversationName("");
    setSearchText("");
    setSearchedList([]);
    setErrMsg(undefined);
  };

  return (
    <BottomSheet
      scrollViewProps={{
        scrollEnabled: false,
        keyboardShouldPersistTaps: "never",
      }}
      onBackdropPress={() => {
        resetState();
        onBackdropPress();
      }}
      isVisible={isBottomSheetVisible}
      {...props}>
      <View style={styles.listContainer}>
        {isConversationNameInputVisible && (
          <InputFieldWithError
            value={conversationName}
            onChangeText={handleOnChangeText}
            errorMsg={errorMsg}
          />
        )}

        {isEditConversation && (
          <View style={styles.addParticipantsStyle}>
            <Text style={styles.addTextStyle}>Add participants</Text>
          </View>
        )}

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <SearchComponent
            placeholder="Search"
            containerStyle={{flex: 0.86, paddingHorizontal: 0}}
            value={searchText}
            onChangeText={handleOnChangeSearchText}
            iconSize={20}
            iconColor={Colors.cyan500}
          />

          <Touch
            customTouchStyle={styles.checkButtonStyle}
            onPress={handleCheckPress}>
            <Icon name="check" size={20} color={Colors.white} />
          </Touch>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {listData?.length > 0 ? (
            listData?.map((item: EmployeeUser, index: number) => (
              <View key={index} style={{marginBottom: 15}}>
                <UserCard
                  image={item?.profileImage}
                  name={item?.name}
                  position={item?.subtitle}
                  onPressCard={() => handleCardPress(item)}
                  customTouchStyles={{
                    ...styles.userCardStyle,
                    backgroundColor: selectedUsers?.some(id => id === item?.uid)
                      ? Colors.lightCyan
                      : Colors.white,
                  }}
                />
              </View>
            ))
          ) : (
            <View>
              <Text>No user found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetList;
