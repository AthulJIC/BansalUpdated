import axios from "axios";
import { ApiUrl } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertService } from "./alert/alertservice";
import AlertMsg from "../utils/alertMsg";
import {navigate} from '../providers/RootNavigator'
import {decode as atob, encode as btoa} from 'base-64'


const AxiosInstance = axios.create({
    baseURL : ApiUrl,
    timeout: 1000 * 30,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("error", error.response);
        if (error.response?.status === 401) {
          //navigate("Login")
            AlertService.ShowSingleActionAlert(AlertMsg.SessionExpird).then(async (data) => {
              await AsyncStorage.removeItem('access_token'); 

            })
            // const refresh = await AsyncStorage.getItem('refresh_token') ;
            // await axios.post(ApiUrl + 'api/token/refresh/', {
            //   refresh: refresh
            // })
            // .then(async (response) => {
            //   console.log('response', response.data)
            //   await AsyncStorage.setItem('access_token', response.data.access)
            //   config.headers.Authorization = `Bearer ${response.data.access}`;
            // })
        }
        else if (!error.response?.config?.url?.includes('Login') || error.response?.status >= 500) {
          AlertService.ShowSingleActionAlert(AlertMsg.UnableToConnectToServer).then((data) => {
            //console.log(data.data);
          })
        }
        else if (!error.response?.config?.url?.includes('Login') || error.response?.status === 400) {
          AlertService.ShowSingleActionAlert(AlertMsg.ServerUnhandledRequest).then((data) => {
            //console.log(data.data);
          })
        }
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.request.use(async (config) => {
    //await AsyncStorage.setItem('access_token', ApiToken);
    const token = await AsyncStorage.getItem('access_token');
    const refresh = await AsyncStorage.getItem('refresh_token') ;
   
    if (token) { 
      try {
        const tokenParts = token.split('.');
        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        const tokenExpiration = tokenPayload.exp * 1000; // Convert to timestamp in milliseconds
       // console.log("tokenExpiration",Date.now(), tokenExpiration);
      if (Date.now() > tokenExpiration) {
       //console.log('worked')
          await axios.post(ApiUrl + 'api/token/refresh/', {
            refresh: refresh
          })
          .then(async (response) => {
            await AsyncStorage.setItem('access_token', response.data.access)
            config.headers.Authorization = `Bearer ${response.data.access}`;
          })
        } else {
          console.log('notworked', refresh)
          await axios.post(ApiUrl + 'api/token/refresh/', {
            refresh: refresh
          })
          .then(async (response) => {
            console.log('response', response.data)
            await AsyncStorage.setItem('access_token', response.data.access)
            config.headers.Authorization = `Bearer ${response.data.access}`;
          })
          //config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error(error);
        throw new Error('Refresh failed');
      }
    }
    return config;
}, (error) => Promise.reject(error));

export default AxiosInstance;