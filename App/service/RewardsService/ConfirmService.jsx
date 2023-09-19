import AxiosInstance from "../axiosservice";

export const confirmService = async (id) => {
    try {
        const response = await AxiosInstance.post('purchase/redemption/'+id+'/');
        return response;
    } catch (error) {
        console.error('confirm service Error:', error);
        throw error;
    }
};