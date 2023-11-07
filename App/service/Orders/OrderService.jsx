import AxiosInstance from "../axiosservice";
export const OrderService=async (districtName, name,page)=>{
        try{
        const response= await AxiosInstance.get('purchase/list_distributors/?page='+page,{
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