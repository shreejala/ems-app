export interface EmployeeUser {
  linkedIn: string;
  description?: string;
  experience?: string[];
  uid: string;
  others?: string[];
  skills?: string[];
  deviceToken: string;
  subtitle: string;
  location?: Location;
  username: string;
  tel: string;
  profileImage: string;
  email: string;
  name: string;
  projectWorked?: string[];
  isChecked?: boolean;
}

export interface Location {
  longitude: number;
  latitude: number;
}
