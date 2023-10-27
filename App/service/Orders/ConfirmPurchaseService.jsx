import AxiosInstance from "../axiosservice";

export const ConfirmPurchaseService = async (quantity,id) => {

    const requestBody = {
        quantity: quantity,
        distributor:id,
        transaction_id:'transaction_id',
    };
   console.log("ConfirmPurchaseService requestBody",requestBody)
    try {
        const response = await AxiosInstance.post('/purchase/order-create/',requestBody);
         console.log("ConfirmPurchaseService response",response)
        return response.data;
    } catch (error) {
        console.error('ReferService Error:', error);
        throw error;
    }
};