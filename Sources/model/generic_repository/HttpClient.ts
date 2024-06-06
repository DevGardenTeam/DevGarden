import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CURRENT_BASE_URL } from "../../constants/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export abstract class HttpClient {
  protected instance: AxiosInstance | undefined;

  protected createInstance(): AxiosInstance {
    this.instance = axios.create({
      baseURL: CURRENT_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.initializeResponseInterceptor();
    return this.instance;
  }

  private initializeResponseInterceptor = () => {
    this.instance?.interceptors.response.use(this.handleResponse, this.handleError);
    
    this.instance?.interceptors.request.use(
      async (config: any) => {
        if (Platform.OS !== 'web') {
          const token = await AsyncStorage.getItem("jwtToken");
          if (token) {
            config.headers = {
              Authorization: `Bearer ${token}`,
            };
          }
        } else {
          const token = localStorage.getItem("jwtToken");
          if (token) {
            config.headers = {
              Authorization: `Bearer ${token}`,
            };
          }
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );
  };

  private handleResponse = ({ data }: AxiosResponse) => data;

  private handleError = (error: any) => Promise.reject(error);
}
