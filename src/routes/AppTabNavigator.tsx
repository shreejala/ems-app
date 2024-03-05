import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import auth from "@react-native-firebase/auth";

import {AppTabParamList, AppTabRoutes} from "./types";
import {ActiveConversation, Dashboard, Home, Profile} from "../screens";
import {Colors} from "../constants/colors";
import {View} from "react-native";
import {Leave} from "../screens/leave";
import useChatBadge from "../hooks/useChatBadge/idnex";

const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator<AppTabParamList>();

  const {hasChatNotification} = useChatBadge();

  const renderTabIcon = ({route, color}) => {
    let iconName;
    switch (route?.name) {
      case AppTabRoutes.Dashboard:
        iconName = "chart-line";
        break;
      case AppTabRoutes.Home:
        iconName = "home";
        break;
      case AppTabRoutes.Profile:
        iconName = "user";
        break;
      case AppTabRoutes.Leave:
        iconName = "clock";
        break;
      case AppTabRoutes.ActiveConversation:
        iconName = "rocketchat";
        break;
      default:
        break;
    }
    return <Icon name={iconName} size={25} color={color} solid />;
  };
  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => renderTabIcon({route, color}),
        tabBarActiveTintColor: Colors.cyan500,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: "8%",
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name={AppTabRoutes.Dashboard}
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={AppTabRoutes.Home}
        component={Home}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name={AppTabRoutes.Leave}
        component={Leave}
        options={{
          title: "Leave History",
        }}
      />

      <Tab.Screen
        name={AppTabRoutes.ActiveConversation}
        component={ActiveConversation}
        options={{
          title: "Chat",
          // tabBarBadge: hasChatNotification ? "" : undefined,
          // tabBarBadgeStyle: {backgroundColor: Colors.red},
        }}
      />

      <Tab.Screen
        name={AppTabRoutes.Profile}
        component={Profile}
        options={{
          title: "Profile",
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <Icon
                name="sign-out-alt"
                size={20}
                onPress={handleSignOut}
                color={Colors.darkGray}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
