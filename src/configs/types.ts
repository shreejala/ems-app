import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

export interface LoginProps {
  username: string;
  password: string;
}

export type loginResponseProps = {
  status: number;
  data: {
    token: string;
    username: string;
  };
};

export type EditProfileContentProps = {
  profileData: FirebaseFirestoreTypes.DocumentData | undefined;
  navigation: any;
  setRefetchProfileData: React.Dispatch<React.SetStateAction<boolean>>;
};

export type registerFormProps = {
  navigateToLogin: () => void;
  handleSignUp: (data: any) => void;
};

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileDetailsPayload {
  username: string;
  name: string;
  subtitle: string;
  tel: string;
  linkedIn: string;
}

export interface ProfileContentPayload {
  description: string;
  skills: string[];
  experience: string[];
}

export type CheckInDataProps = {
  checkIn: string;
  checkOut: string;
  date: string;
};

export type checkInCheckOutCardProps = {
  uid?: string;
  checkIn: boolean;
  checkOut: boolean;
  setCheckIn: (checkIn: boolean) => void;
  setCheckOut: (checkOut: boolean) => void;
  checkInData?: CheckInDataProps;
  ssid?: string;
};

export interface FirebaseLeaveData {
  status: string;
  reason: string;
  createdDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp;
  approver: string;
  leaveId: string;
  applierId: string;
  leaveType: string;
  leaveReason: string;
  startDate: FirebaseFirestoreTypes.Timestamp;
  applicantUsername?: string;
}

export interface LeaveData {
  userId: string;
  leaves: FirebaseLeaveData[];
}

export interface TransformedLeaveData {
  date: string;
  leaveData: string[];
  wfhData: string[];
  // Add other properties as needed
}

export type UserActivityPayloadType = {
  checkInData?: CheckInDataProps;
  checkOut?: string;
  reason?: string;
  date: Date;
  status?: string;
};

export type CheckInObjectType = {
  checkIn: string;
  checkOut: string;
  date: string;
};

export type CheckOutType = {
  checkOut: string;
  reason: string;
  status: string;
  checkIn?: string | undefined;
  date?: string | undefined;
};
