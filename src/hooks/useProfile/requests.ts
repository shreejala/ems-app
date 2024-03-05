import axios from "../../configs/axios";
import {appUrl} from "../../utils/url";

export const requestUserList = async () => {
  const data = await axios.get(`${appUrl}/user`);

  return data;
};
