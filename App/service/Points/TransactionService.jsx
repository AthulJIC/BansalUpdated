import AxiosInstance from "../axiosservice";
export const TransactionAPI=async ()=>{
        return await AxiosInstance.get('/purchase/history-list/')
    
}