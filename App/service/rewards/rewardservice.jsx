import AxiosInstance from "../axiosservice";

export const RewardsApi = {
        getState: async function () {
                return await AxiosInstance.get('core/state/')
        },
        addAddress: async function (data) {
                return await AxiosInstance.post('account/address/', data)
        },
        getRedeemtion: async function (data) {
                return await AxiosInstance.post(`purchase/redemption/${data}`)
        },
        updateAddress: async function (data, id) {
                return await AxiosInstance.put('account/address-update/' + id + '/', data)
        },
        deleteAddress: async function (id) {
                return await AxiosInstance.delete('account/address-delete/' + id + '/')
        },
        purchaseRewards: async function (id) {
                return await AxiosInstance.get('purchase/rewards/' + id)
        },
        postIdVerification: async function (data, redemptionId) {
                // console.log("postIdVerification",data)
                return await AxiosInstance.postForm('purchase/verify_id/', data)
        },
        IdVerificationUpdate: async function (data, redemptionId) {
                const Body = {
                        redemption_id: redemptionId,
                }
                console.log("data, redemptionId", data, redemptionId)
                return await AxiosInstance.patch(`/purchase/id-verification-update/${data}/`, Body);
        }
}


