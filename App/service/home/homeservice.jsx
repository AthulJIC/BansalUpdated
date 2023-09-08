import AxiosInstance from "../axiosservice";

export const HomeApi = {
    getPoints: async function () {
        return await AxiosInstance.get('purchase/points/');
    }
}