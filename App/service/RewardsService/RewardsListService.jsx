import AxiosInstance from "../axiosservice";
export const RewardslistService=async ()=>{
        return await AxiosInstance.get('purchase/rewards/')
    
}