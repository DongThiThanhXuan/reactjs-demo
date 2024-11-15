import { AxiosRequestConfig } from "axios";
import axiosClient from "..";
import { Endpoint } from "../config";

export const getProductApi = () => {
    return axiosClient.get(Endpoint.GET_PRODUCT);
};
export const addNewProduct = (params: FormData, config?: AxiosRequestConfig<FormData>) => axiosClient.post(Endpoint.ADD_PRODUCT, params, config);

