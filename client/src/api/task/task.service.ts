import axios, { AxiosResponse } from "axios";
import { apiUrl } from "../api-url";
import { ManyResponse } from "../_shared/many-response.model";
import { TaskModel } from "./task.model";
import { SingleResponseModel } from "../_shared/single-response.model";

export class TaskService {
  static list = async (signal: AbortSignal): Promise<AxiosResponse<ManyResponse<TaskModel>>> => {
    return axios.get(`${apiUrl}/v1/tasks`, { signal });
  };

  static create = async (data: { title: string }): Promise<AxiosResponse<SingleResponseModel<TaskModel>>> => {
    return axios.post(`${apiUrl}/v1/tasks`, data);
  };

  static remove = async (id: string): Promise<AxiosResponse<SingleResponseModel<TaskModel>>> => {
    return axios.delete(`${apiUrl}/v1/tasks/${id}`);
  };
}
