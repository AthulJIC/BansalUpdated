import AxiosInstance from "../axiosservice";

export const AddAddressService = async (params) => {
    const requestBody = {
        mobile: params.mobile,
        name:params.name,
        address_1:params.location,
        address_2:params.area,
        land_mark:params.landMark,
        pincode:params.pinCode,
        city:params.Value,
        is_default:params.isDefault,
        state:params.states,
    };
     console.log("requestBody",requestBody)
    try {
        const response = await AxiosInstance.post('/account/address/',requestBody);
        return response.data;
    } catch (error) {
        console.error('ReferService Error:', error);
        throw error;
    }
};
export const updateAddressService = async (params,id) => {
    const requestBody = {
        mobile: params.mobile,
        name:params.name,
        address_1:params.location,
        address_2:params.area,
        land_mark:params.landMark,
        pincode:params.pinCode,
        city:params.Value,
        is_default:params.isDefault,
        state:params.states,
    };
     console.log("requestBody update",requestBody,id)
    try {
        const response = await AxiosInstance.put('/account/address-update/'+id+'/',requestBody);
        console.log("response",response)
        return response.data;
    } catch (error) {
        console.error('ReferService Error:', error);
        throw error;
    }
};

export const deleteAddressService = async (id) => {
    try {
        const response = await AxiosInstance.delete('/account/address-delete/'+id+'/');
        return response.data;
    } catch (error) {
        console.error('ReferService Error:', error);
        throw error;
    }
};