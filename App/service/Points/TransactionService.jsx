import AxiosInstance from "../axiosservice";

export const TransactionAPI = {
        getTransactions: async function () {
                return await AxiosInstance.get('purchase/history-list/')
        }
}