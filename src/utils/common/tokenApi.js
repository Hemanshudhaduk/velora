import axios from "axios";
import * as authentication from "./../authProvider";

const axiosTokenServices = axios.create();

const getToken = async () => {
  let token = "";
  await authentication.acquireAccessToken().then(silentResponse => {
    if (silentResponse) {
      token = silentResponse.accessToken;
    }
  });
  return token;
};

axiosTokenServices.interceptors.request.use(
  async config => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosTokenServices.interceptors.response.use(
  response => {
    return response?.data ? response?.data : response;
  },
  error => {
    if (error?.response?.status === 401) {
      authentication.signIn();
    }
    return Promise.reject(error);
  }
);

export default axiosTokenServices;
