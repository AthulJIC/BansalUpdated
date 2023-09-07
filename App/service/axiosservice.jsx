import axios from "axios";
import { ApiUrl, ApiToken } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertService } from "./alert/alertservice";
import AlertMsg from "../utils/alertMsg";

const AxiosInstance = axios.create({
    baseURL : ApiUrl,
    timeout: 1000 * 30,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error.response?.status);
        if (error.response?.status === 401) {
            AlertService.ShowSingleActionAlert(AlertMsg.SessionExpird).then(async (data) => {
              console.log(data.data);
              await AsyncStorage.removeItem('access_token');
              //Move to login
            })
        }
        else if (error.response?.status >= 500) {
          AlertService.ShowSingleActionAlert(AlertMsg.UnableToConnectToServer).then((data) => {
            console.log(data.data);
          })
        }
        else if (error.response?.status === 400) {
          AlertService.ShowSingleActionAlert(AlertMsg.ServerUnhandledRequest).then((data) => {
            console.log(data.data);
          })
        }
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.request.use(async (config) => {
    //await AsyncStorage.setItem('access_token', ApiToken);
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      try {
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error(error);
        throw new Error('Refresh failed');
      }
    }
    return config;
}, (error) => Promise.reject(error));

export default AxiosInstance;