import {useState} from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {showToast} from "../../utils/showToast";
import {requestGoogleMeetLink} from "./request";

const useCreateGoogleEvent = () => {
  const [isLoadingGMeet, setIsLoadingGMeet] = useState(false);

  const createGoogleMeet = async () => {
    setIsLoadingGMeet(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const googleTokens = await GoogleSignin.getTokens();

      const body = {
        summary: "Instant google meet.",
        description: "",
        start: {
          dateTime: new Date().toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(Date.now() + 3600000).toISOString(),
          timeZone: "UTC",
        },
        conferenceData: {
          createRequest: {
            requestId: "sample123",
            conferenceSolutionKey: {type: "hangoutsMeet"},
          },
        },
      };

      const response = await requestGoogleMeetLink(
        body,
        googleTokens?.accessToken || "",
      );

      setIsLoadingGMeet(false);
      return response;
    } catch (e: any) {
      setIsLoadingGMeet(false);
      if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast({
          type: "error",
          text1: "Google sign in failed.",
          text2: "Google play services not available or outdated.",
        });
      } else {
        const message =
          e?.response?.data?.error?.status === "UNAUTHENTICATED"
            ? "Failed to authorize email"
            : e?.message;
        showToast({type: "error", text1: message});
      }
    }
  };

  return {createGoogleMeet, isLoadingGMeet};
};

export default useCreateGoogleEvent;
