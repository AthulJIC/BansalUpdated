import AxiosInstance from "../axiosservice";

export const RequestApi = {
    getRequest: async function (params) {
        return await AxiosInstance.get('purchase/distributor-requests/?page='+params)
    },
    acceptRequest : async function(params){
        return await AxiosInstance.put('purchase/distributor-accept/'+params)
    },
    rejectRequest: async function(params){
        return await AxiosInstance.put('purchase/distributor-reject/'+params)
    },
    searchRequest: async function(params1,params2){
        return await AxiosInstance.get(`purchase/distributor-requests/?page=${params1}&search=${params2}`)
    }
}