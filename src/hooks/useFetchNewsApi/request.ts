import axios from "../../configs/axios";
import {rapidApiHost, rapidApiKey} from "../../configs/newsApiConfig";
import endpoints from "../../constants/endpoints";

const {newsApi} = endpoints;

export const requestNewsApi = async payload => {
  const response = await axios.get(newsApi, {
    params: payload,
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiHost,
    },
  });
  return response;
};
