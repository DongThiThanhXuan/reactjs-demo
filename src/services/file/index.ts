import axiosClient from "..";
import { Endpoint } from "../config";


export const getImageByFileName = async (fileName: string): Promise<string> => {
    try {
        // Cải tiến cú pháp gọi Axios với config ở tham số thứ 2
        const response = await axiosClient.get(`${Endpoint.GET_IMAGE}/${fileName}`, {
            responseType: 'blob', // Cấu hình kiểu phản hồi là blob
        });

        // Tạo URL từ blob dữ liệu
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};