import AxiosInstance from "../axiosservice";

export const confirmService = async (id) => {
    // console.log("mobileNumber,name,referral,location",mobileNumber,name,referral,location)
    // const requestBody = {
    //     mobile_no: mobileNumber,
    //     name:name,
    //     site_location:location,
    //     order:quantity,
    //     referral_id:"referral_id"
    // };
    // console.log("pranav",id)
    try {
        const response = await AxiosInstance.post('/purchase/redemption/'+id+'/');
        return response;
    } catch (error) {
        console.error('confirm service Error:', error);
        throw error;
    }
};