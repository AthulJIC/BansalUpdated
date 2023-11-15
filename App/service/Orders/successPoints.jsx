
import { Axios } from "axios";
import AxiosInstance from "../axiosservice";
export const OrderPointsService = async (role, ton) => {
        try {
                const response = await AxiosInstance.get(`purchase/points-display/?role=${role}&quantity=${ton}`)
                //console.log("order response",response)
                return response
        } catch (error) {
                throw (console.log("points service", error))
        }

}
export const OrderPointsServiceRedeem = async (role) => {
         try {
                const response = await AxiosInstance.get(`purchase/points-display/?role=${role}`)
                //console.log("order response",response)
                return response
        } catch (error) {
                throw (console.log("points service", error))
        }

}