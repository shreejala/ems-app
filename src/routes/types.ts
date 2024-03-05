import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

import {CompositeScreenProps} from "@react-navigation/native";

export enum AppRoutes {
  AppTabNavigator = "AppTabNavigator",
  EmployeeDetails = "Employee Details",
  EditProfile = "Edit Profile",
  QRScreen = "QR Screen",
  EditProfileDetails = "Edit Profile Details",
  ChatScreen = "Chat Screen",
  LeaveApply = "Apply Leave",
}

export enum AuthRoutes {
  Login = "Login",
  LoginDashboard = "LoginDashboard",
  Register = "Register",
}

export enum AppTabRoutes {
  Dashboard = "Dashboard",
  Home = "Home",
  Leave = "Leave",
  Profile = "My Profile",
  ActiveConversation = "Active Conversation",
}

export type AppStackParamList = {
  [AppRoutes.AppTabNavigator]: undefined;
  [AppRoutes.EmployeeDetails]: {employee: string} | undefined;
  [AppRoutes.EditProfile]: undefined;
  [AppRoutes.QRScreen]: undefined;
  [AppRoutes.EditProfileDetails]: undefined;
  [AppRoutes.ChatScreen]:
    | {conversationId: string; chatScreenName: string}
    | undefined;
  [AppRoutes.LeaveApply]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.LoginDashboard]: undefined;
  [AuthRoutes.Register]: undefined;
};

export type AppTabParamList = {
  [AppTabRoutes.Dashboard]: undefined;
  [AppTabRoutes.Home]: undefined;
  [AppTabRoutes.Leave]: undefined;
  [AppTabRoutes.Profile]: undefined;
  [AppTabRoutes.ActiveConversation]: undefined;
};

export type AppStackScreenProps<
  StackRouteName extends keyof AppStackParamList = AppRoutes,
> = NativeStackScreenProps<AppStackParamList, StackRouteName>;

export type AuthStackScreenProps<
  RouteName extends keyof AuthStackParamList = AuthRoutes,
> = NativeStackScreenProps<AuthStackParamList, RouteName>;

export type AppTabScreenProps<
  TabRouteName extends keyof AppTabParamList = AppTabRoutes,
> = BottomTabScreenProps<AppTabParamList, TabRouteName>;

export type StackTabScreenProps<
  TabRouteName extends keyof AppTabParamList = AppTabRoutes,
  StackRouteName extends keyof AppStackParamList = AppRoutes,
> = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, TabRouteName>,
  NativeStackScreenProps<AppStackParamList, StackRouteName>
>;
