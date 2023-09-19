import AxiosInstance from "../axiosservice";
export const LocationService=async ()=>{
        return await AxiosInstance.get('/core/location/')
    
}