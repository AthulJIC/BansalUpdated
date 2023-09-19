import AxiosInstance from "../axiosservice";

export const RequestApi = {
    getRequest: async function () {
        return await AxiosInstance.get('purchase/distributor-requests/')
    },
    acceptRequest : async function(params){
        return await AxiosInstance.put('purchase/distributor-accept/'+params+'/')
    },
    rejectRequest: async function(params){
        return await AxiosInstance.put('purchase/distributor-reject/'+params+'/')
    },
    searchRequest: async function(params){
        return await AxiosInstance.get('purchase/distributor-requests/?search='+params)
    }
}