import React, {useEffect, useState} from "react";
import {FlatList, RefreshControl, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FAB} from "@rneui/themed";

import {AppRoutes, AppTabRoutes, StackTabScreenProps} from "../../routes/types";
import useLeaveDetail from "../../hooks/useLeaveDetails";
import {Colors} from "../../constants/colors";
import useDeleteLeave from "../../hooks/useDeleteLeave";
import {useUpdateLeave} from "../../hooks/useUpdateLeave";
import {differenceInDays} from "date-fns";
import LeaveHistory from "../../components/organisms/LeaveHistory/LeaveHistory";
import {ListEmpty} from "../../components/molecules";
import {sendNotification} from "../../utils/notificationUtils";
import usePushNotify from "../../hooks/usePushNotify";

import leaveDetailStyles from "./style";

const Leave = ({navigation}: StackTabScreenProps<AppTabRoutes.Leave>) => {
  const {
    leaveData,
    isLeaveDetailLoading,
    isLeaveDetailRefresh,
    refreshLeaveData,
  } = useLeaveDetail();
  const updateLeaveStatus = useUpdateLeave();
  const {deleteLeave} = useDeleteLeave();
  const {sendPushNotify} = usePushNotify();
  const [role, setRole] = useState<string | null>();

  const handleUpdateLeaveStatus = (
    leaveId: string,
    status: string,
    deviceToken: string,
    startDate: any,
    endDate: any,
  ) => {
    updateLeaveStatus(leaveId, status);
    refreshLeaveData();

    const body = `Your leave request for ${startDate
      .toDate()
      .toDateString()} to ${endDate.toDate().toDateString()}  has been ${
      status === "Accept" ? "accepted" : "rejected"
    }`;

    sendNotification({
      sendPushNotify,
      title: "Leave Reply",
      body,
      token: deviceToken,
      onSuccessCallback: response => {
        console.log("Notification sent successfully:replyyy", response);
      },
      onErrorCallback: error => {
        console.error("Error sending notification:", error);
      },
    });
  };

  const handleDeleteLeave = (leaveId: string) => {
    deleteLeave(leaveId);
    refreshLeaveData();
  };

  const handleLeave = () => {
    navigation.navigate(AppRoutes.LeaveApply);
  };
  const leaveDuration = (endDate, startDate) => {
    const targetDate = new Date(endDate.toDate());
    const anotherDate = new Date(startDate.toDate());
    const diffInDays = differenceInDays(targetDate, anotherDate);

    return diffInDays + 1;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const userRole = await AsyncStorage.getItem("role");
      setRole(userRole || "Employee");
      if (leaveData && leaveData.length > 0) {
        refreshLeaveData();
      }
    });

    return unsubscribe;
  }, [navigation, refreshLeaveData, leaveData]);

  const renderLeave = ({item, index}) => {
    return (
      <LeaveHistory
        key={index}
        item={item}
        handleUpdateLeaveStatus={handleUpdateLeaveStatus}
        handleDeleteLeave={handleDeleteLeave}
        role={role}
        leaveDuration={leaveDuration}
      />
    );
  };

  return (
    <View style={leaveDetailStyles.wrapperContainer}>
      {isLeaveDetailLoading || leaveData?.length === 0 ? (
        <ListEmpty
          isLoading={isLeaveDetailLoading}
          emptyMessage={"No Leave History"}
        />
      ) : (
        <FlatList
          data={leaveData}
          style={leaveDetailStyles.flatList}
          renderItem={renderLeave}
          keyExtractor={item => item.leaveId.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isLeaveDetailRefresh}
              onRefresh={refreshLeaveData}
            />
          }
          showsHorizontalScrollIndicator={false}
        />
      )}

      {role === "Employee" && (
        <FAB
          visible
          icon={{name: "add", color: "white"}}
          size="large"
          placement="right"
          color={Colors.cyan500}
          onPress={handleLeave}
        />
      )}
    </View>
  );
};

export default Leave;
