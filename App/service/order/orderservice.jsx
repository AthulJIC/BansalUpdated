//const response= await AxiosInstance.get(`purchase/points-display/?role=${role}&quantity=${ton}`)
import AxiosInstance from "../axiosservice";

export const OrderApi = {
    getDistributorList: async function (district, name) {
        return await AxiosInstance.get(`purchase/list_distributors/?search=${name}&district_name=${district}`)
    },
    getLocation : async function (params){
        return await AxiosInstance.get('core/location/?search='+params)
    },
    
}