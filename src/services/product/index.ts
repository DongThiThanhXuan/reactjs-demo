import axiosClient from "..";
import { Endpoint } from "../config";

export const getProductApi = () => {
    return axiosClient.get(Endpoint.GET_PRODUCT);
};