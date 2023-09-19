import AxiosInstance from "../axiosservice";
export const AddressListService=async (districtName, name)=>{
        try{
        const response= await AxiosInstance.get('/account/address-list/')
        //  console.log("Address List",response)
        return response
}catch(error){
        throw error
}
    
}