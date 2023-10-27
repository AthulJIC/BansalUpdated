import axios from "axios";
import AxiosInstance from "../axiosservice";

export const HistoryApi = {
    getHistory: async function (params) {
        return await AxiosInstance.get('purchase/history-list/?page'+params)
    },
    getDistributorHistory: async function (params) {
        return await AxiosInstance.get('purchase/distributor-history/?page='+params)
    },
    getDistributorStatus: async function (params1, params2) {
        return await AxiosInstance.get(`purchase/distributor-history/?page=${params1}&user_approval=${params2}`)
    },
    getHistoryStatus : async function (params1,params2){
       return await AxiosInstance.get(`purchase/history-list/?page=${params1}&status=${params2}`)
    },
    getReferralHisytory: async function (params1,params2){
        return await AxiosInstance.get(`purchase/history-list/?page=${params1}&referral=${params2}`)
    }
}


 