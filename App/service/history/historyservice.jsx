import AxiosInstance from "../axiosservice";

export const HistoryApi = {
    getHistory: async function () {
        return await AxiosInstance.get('purchase/history-list/')
    },
    getDistributorHistory: async function () {
        return await AxiosInstance.get('purchase/distributor-history/')
    },
    getDistributorStatus: async function (params) {
        return await AxiosInstance.get('purchase/distributor-history/?user_approval='+params)
    },
    getHistoryStatus : async function (params){
       return await AxiosInstance.get('purchase/history-list/?status='+params)
    }
}


 