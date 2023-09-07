import AxiosInstance from "../axiosservice";

export const LoginApi = {
    userLogin: async function (data) {
        return await AxiosInstance.post('account/token/',data)
    }
}