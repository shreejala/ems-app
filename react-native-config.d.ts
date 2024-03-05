declare module "react-native-config" {
  export interface NativeConfig {
    FIREBASE_SERVER_KEY: string;
    LOCAL_API?: string;
    HOSTNAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
