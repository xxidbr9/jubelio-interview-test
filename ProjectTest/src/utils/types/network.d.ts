import { AxiosResponse } from "axios"

export interface ResponseSuccess<T> {
  data?: T | null,
  message?: string,
}

export interface ResponseFail {
  error?: Error | string
}

export interface NetworkResponse<T> extends ResponseSuccess<T>, ResponseFail { }

export interface NetworkPromise<T> extends Promise<AxiosResponse<NetworkResponse<T>>> { }