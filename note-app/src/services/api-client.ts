import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
});

export interface FetchResponse<T> {
  success: boolean;
  results: T[];
}
class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data.results);
  };
  post = (data: T, config: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };
  update = (data: T, config: AxiosRequestConfig) => {
    return axiosInstance
      .patch<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };
  delete = (config: AxiosRequestConfig) =>
    axiosInstance.delete<T>(this.endpoint, config).then((res) => res.data);
}

export default APIClient;
