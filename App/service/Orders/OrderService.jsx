import AxiosInstance from "../axiosservice";
export const OrderService=async (districtName, name)=>{
        try{
        const response= await AxiosInstance.get('purchase/list_distributors/',{
                params:{
                        district: districtName,
                        search:name
                }
        })
        // console.log("order response",response)
        return response
}catch(error){
        throw error
}
    
}