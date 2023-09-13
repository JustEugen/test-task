import axios, { AxiosResponse } from "axios";
import { apiUrl } from "../api-url";

export class AuthService {
  static authorizationCheck = async (): Promise<AxiosResponse<string>> => {
    return axios.post(`${apiUrl}/v1/auth/authorization-check`);
  };

  static login = async (data: { name: string; password: string }): Promise<AxiosResponse<string>> => {
    return axios.post(`${apiUrl}/v1/auth/login`, {
      name: data.name,
      password: data.password,
    });
  };

  static register = async (data: { name: string; password: string }): Promise<AxiosResponse<never>> => {
    console.log("aa: ", apiUrl);
    return axios.post(`${apiUrl}/v1/auth/register`, {
      name: data.name,
      password: data.password,
    });
  };
}
