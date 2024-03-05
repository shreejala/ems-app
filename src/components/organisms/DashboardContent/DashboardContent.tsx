import React from "react";
import DashboardHeaderLayout from "../../molecules/Dashboard/DashboardHeaderLayout";
import {DotPaginatorCarousel} from "../../molecules/DotPaginatorCarousel";
import {Linking, ScrollView, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Text} from "@rneui/themed";
import CardCarousel from "../../molecules/Dashboard/CardCarousel";
import {holidays} from "../../../utils/dummyUserData";
import DateComponent from "../../molecules/DateComponent";
import CheckinCheckoutCard from "../../molecules/Dashboard/CheckinCheckoutCard";
import useAuthenticate from "../../../hooks/useAuthenticate";
import useLeaveInfo from "../../../hooks/useLeave";
import {FirebaseLeaveData} from "../../../configs/types";
import useUserActivity from "../../../hooks/useUserActivity";
import useGetSsid from "../../../hooks/useGetSsid";
import useFetchNewsApi from "../../../hooks/useFetchNewsApi";

const DashboardContent = () => {
  const user = useAuthenticate();
  const {checkIn, setCheckIn, checkOut, setCheckOut, checkInData} =
    useUserActivity();
  const {wifiSSID} = useGetSsid();
  const {articles, isApiLoading} = useFetchNewsApi();

  const {leaveData, transformFirebaseData} = useLeaveInfo();

  const leaveFilteredData = transformFirebaseData(
    leaveData as FirebaseLeaveData[],
  );

  const onLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.textContainerStyle}>
        <TouchableOpacity onPress={() => onLinkPress(item?.url)}>
          <Text style={styles.textStyle}>
            {item?.title && item.title.length > 60
              ? `${item.title.substring(0, 60)}...`
              : item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DashboardHeaderLayout>
        {!isApiLoading && articles.length > 0 ? (
          <DotPaginatorCarousel data={articles} renderItem={renderItem} />
        ) : (
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Opencafe</Text>
          </View>
        )}
      </DashboardHeaderLayout>
      <ScrollView
        style={styles.scrollContentView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardContentView}>
          <View style={styles.userActivityContainer}>
            <Text style={styles.dashboardTitleTextStyle}>
              Check-in/Check-out
            </Text>
            <CheckinCheckoutCard
              uid={user?.uid}
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
              checkInData={checkInData}
              ssid={wifiSSID}
            />
          </View>
          <View style={styles.leaveCardContainer}>
            <Text style={styles.leaveLabelTextStyle}>On Leave This Week </Text>
            <CardCarousel data={leaveFilteredData} />
          </View>
          <View style={styles.holidayContentContainer}>
            <Text style={styles.dashboardTitleTextStyle}>
              Upcoming Holidays
            </Text>
            <View style={[styles.holidayCardContainer, styles.dashboardCard]}>
              {holidays.map((holiday, index) => (
                <DateComponent
                  key={index}
                  createdDate={holiday}
                  height={60}
                  width={55}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DashboardContent;
