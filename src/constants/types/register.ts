export interface RegisterResponseType {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface User {
  multiFactor: MultiFactor;
  metadata: Metadata;
  photoURL?: any;
  phoneNumber?: any;
  tenantId?: any;
  displayName?: any;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: string;
  providerData: ProviderDatum[];
  providerId: string;
}
export interface ProviderDatum {
  email: string;
  providerId: string;
  photoURL?: any;
  phoneNumber?: any;
  displayName?: any;
  uid: string;
}
export interface Metadata {
  lastSignInTime: number;
  creationTime: number;
}
export interface MultiFactor {
  enrolledFactors: any[];
}
export interface AdditionalUserInfo {
  isNewUser: boolean;
}
