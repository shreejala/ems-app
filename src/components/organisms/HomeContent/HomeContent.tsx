import {Avatar, Icon} from "@rneui/themed";
import React, {useEffect, useState} from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import {AppRoutes} from "../../../routes/types";
import ImageShimmerEffect from "../../atoms/ImageShimmerEffect";
import SearchComponent from "../../atoms/SearchComponent";
import {Colors} from "../../../constants/colors";
import HomeContentStyles from "./style";
import useEmployeeInfo from "../../../hooks/useEmployeeInfo";
import {getNameInitialsFromName} from "../../../utils/globalHelpers";

const defaultAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";
export interface EmployeeType {
  uid: string;
  name: string;
  profileImage: string;
  subtitle: string;
  tel: string;
  email?: string;
  linkedIn?: string;
  skills?: string[];
  projectWorked?: string[];
  description?: string;
  experience?: string[];
}
const HomeContent = ({navigation}) => {
  const [searchText, setSearchText] = useState("");
  const [wholeList, setWholeList] = useState<EmployeeType[]>(
    [] as EmployeeType[],
  );
  const [filteredList, setFilteredList] = useState<EmployeeType[]>(
    [] as EmployeeType[],
  );
  const {
    isEmployeeInfoRefresh,
    isEmployeeInfoLoading,
    refreshEmployeeData,
    empData,
  } = useEmployeeInfo();

  useEffect(() => {
    empData && setWholeList(empData);
  }, [empData]);

  const handleOnChangeSearchText = value => {
    setSearchText(value);

    const matchingEmployee = wholeList.filter((item: EmployeeType) => {
      const name = (item?.name as string) ?? "";
      const compareTo = typeof value === "string" ? value.toLowerCase() : "";
      return name.toLowerCase().includes(compareTo);
    });
    setFilteredList(matchingEmployee);
  };

  const openDialScreen = tel => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:${tel}`;
    } else {
      number = `tel:${tel}`;
    }
    Linking.openURL(number);
  };

  const renderItem = ({item, index}) => {
    const conditionalAvatarTitle =
      !item?.profileImage && getNameInitialsFromName(item?.name) !== ""
        ? getNameInitialsFromName(item?.name)
        : undefined;

    const conditionalAvatarImage = item?.profileImage
      ? {uri: item?.profileImage}
      : getNameInitialsFromName(item?.name) === ""
        ? {uri: defaultAvatar}
        : undefined;

    return (
      <View key={index} style={HomeContentStyles.flatListContainer}>
        <TouchableOpacity
          style={HomeContentStyles.touchableContainer}
          onPress={() =>
            navigation.navigate(AppRoutes.EmployeeDetails, {
              employee: item.uid,
            })
          }>
          <Avatar
            size={65}
            rounded
            title={conditionalAvatarTitle}
            source={conditionalAvatarImage}
            containerStyle={{backgroundColor: Colors.cyan500}}
            imageProps={{
              PlaceholderContent: (
                <ImageShimmerEffect width={65} height={65} borderRadius={500} />
              ),
            }}
          />

          <View style={HomeContentStyles.content}>
            <Text style={HomeContentStyles.contentText1}>{item?.name}</Text>

            <Text style={HomeContentStyles.contentText2}>{item?.subtitle}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={HomeContentStyles.phoneContainer}
          onPress={() => openDialScreen(item.tel)}>
          <Icon name="phone" color={Colors.cyan500} size={30} />
        </TouchableOpacity>
      </View>
    );
  };

  const handleNoData = () => {
    return (
      <View style={HomeContentStyles.emptyContainerStyle}>
        {isEmployeeInfoLoading || wholeList.length === 0 ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={HomeContentStyles.emptyContainerTextStyle}>
            No Data Found
          </Text>
        )}
      </View>
    );
  };

  return (
    <>
      <SearchComponent
        placeholder="Search Employees Name"
        style={HomeContentStyles.placeholderStyle}
        value={searchText}
        onChangeText={handleOnChangeSearchText}
        iconSize={20}
        iconColor={Colors.cyan500}
        iconStyle={HomeContentStyles.inputIconStyle}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={HomeContentStyles.flatListStyle}
        contentContainerStyle={HomeContentStyles.listContentStyle}
        data={searchText.length > 0 ? filteredList : wholeList}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isEmployeeInfoRefresh}
            onRefresh={refreshEmployeeData}
          />
        }
        keyExtractor={(item: EmployeeType, index) => `${item?.name}${index}`}
        ListEmptyComponent={handleNoData}
        initialNumToRender={wholeList.length}
      />
    </>
  );
};

export default HomeContent;
