import React, {useCallback, useEffect} from "react";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import messaging from "@react-native-firebase/messaging";
import {useNavigation} from "@react-navigation/native";

import {AppRoutes, AppStackParamList} from "./types";
import AppTabNavigator from "./AppTabNavigator";
import {
  EditProfile,
  EditProfileDetails,
  ChatScreen,
  AnimatedEmployeeDetails,
} from "../screens";
import QRScreen from "../screens/qrScreen/QRScreen";
import LeaveApply from "../components/organisms/LeaveApply/LeaveApply";
import {NotificationType} from "../constants/types/notification";
import useChatBadge from "../hooks/useChatBadge/idnex";

const AppStack = createNativeStackNavigator<AppStackParamList>();

export type StackNavigation = NativeStackNavigationProp<AppStackParamList>;

const AppNavigator = () => {
  const navigation = useNavigation<StackNavigation>();
  const {setChatNotification} = useChatBadge();

  const handleNotification = useCallback(
    notification => {
      const notificationBody =
        notification?.data?.body && JSON.parse(notification?.data?.body);
      switch (notification?.data?.title) {
        case NotificationType.CHAT:
          setChatNotification(false);

          navigation.navigate(AppRoutes.ChatScreen, {
            conversationId: notificationBody?.conversationId || "",
            chatScreenName:
              notificationBody?.conversation?.conversationName || "Chat",
          });
          return;
        default:
          return;
      }
    },
    [navigation, setChatNotification],
  );

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      // "Notification caused app to open from background state:"
      remoteMessage && handleNotification(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // "Notification caused app to open from quit state:"
        remoteMessage && handleNotification(remoteMessage);
      });

    return unsubscribe;
  }, [handleNotification]);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
      }}>
      <AppStack.Screen
        name={AppRoutes.AppTabNavigator}
        component={AppTabNavigator}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={AppRoutes.ChatScreen}
        component={ChatScreen}
        options={({route}) => ({
          title: route?.params?.chatScreenName,
        })}
      />

      <AppStack.Screen
        name={AppRoutes.EmployeeDetails}
        component={AnimatedEmployeeDetails}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: "white",
          headerBackTitleVisible: false,
        }}
      />

      <AppStack.Screen name={AppRoutes.EditProfile} component={EditProfile} />

      <AppStack.Screen
        name={AppRoutes.EditProfileDetails}
        component={EditProfileDetails}
      />
      <AppStack.Screen name={AppRoutes.QRScreen} component={QRScreen} />

      <AppStack.Screen name={AppRoutes.LeaveApply} component={LeaveApply} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
