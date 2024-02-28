import AxiosInstance from "../axiosservice";
export const RewardslistService=async (params)=>{
        return await AxiosInstance.get('purchase/rewards-list/?page='+params)
    
}