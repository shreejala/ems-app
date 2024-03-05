import axios, {AxiosError, AxiosResponse} from "axios";

axios.interceptors.request.use(async function (config) {
  axios.defaults.headers.post.Accept = "application/json";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return config;
});

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError<any>) {
    return error;
  },
);

export default axios;
