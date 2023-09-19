
import AxiosInstance from "../axiosservice";

export const ReferService = async (mobileNumber,name,referral,quantity,location) => {
    // console.log("mobileNumber,name,referral,location",mobileNumber,name,referral,location)
    const requestBody = {
        mobile_no: mobileNumber,
        name:name,
        site_location:location,
        order:quantity,
        referral_id:"referral_id"
    };
    console.log("requestBody",requestBody)
    try {
        const response = await AxiosInstance.post('/purchase/leads/',requestBody);
        return response.data;
    } catch (error) {
        console.error('ReferService Error:', error);
        throw error;
    }
};