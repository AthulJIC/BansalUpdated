import AxiosInstance from "../axiosservice";

export const CommonAPI = {
    Points: async function (data) {
        return await AxiosInstance.get('purchase/points/')
    }
}