import axios from "../../configs/axios";

import {googleApiKey} from "../../configs/googleApiConfig";
import endpoints from "../../constants/endpoints";

const {googleMeetLink} = endpoints;

export const requestGoogleMeetLink = async (body, token: string) => {
  const response = await axios.post(
    `${googleMeetLink}?key=${googleApiKey}&conferenceDataVersion=1`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};
