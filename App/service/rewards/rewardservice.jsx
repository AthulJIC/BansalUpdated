import AxiosInstance from "../axiosservice";

export const RewardsApi = {
        getState: async function () {
                return await AxiosInstance.get('core/state/')
        },
        addAddress: async function (data) {
                return await AxiosInstance.postForm('account/address/',data)
        },
        getRedeemtion: async function (data) {
                return await AxiosInstance.post(`purchase/redemption/${data}`)
        },
        updateAddress: async function (data, id) {
                return await AxiosInstance.putForm('account/address-update/' + id + '/', data)
        },
        deleteAddress: async function (id) {
                return await AxiosInstance.delete('account/address-delete/' + id + '/')
        },
        purchaseRewards: async function (id) {
                return await AxiosInstance.get('purchase/rewards/' + id)
        },
        postIdVerification: async function (data) {
                return await AxiosInstance.postForm('purchase/extract-id/', data)
        },
        idVerify :  async function (data, id){
                return await AxiosInstance.put('purchase/id-verification-edit/'+ id + '/', data)
        },
        redemption : async function (id){
                return await AxiosInstance.post('purchase/redemption/'+id)
        },
}


