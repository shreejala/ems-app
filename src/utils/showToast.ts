import Toast from "react-native-toast-message";

interface ToastParams {
  type: string; // 'success', 'error', 'info', or any custom type
  text1: string;
  text2?: string; // Optional parameter
}

export const showToast = ({type, text1, text2}: ToastParams) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
  });
};
