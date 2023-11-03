import AxiosInstance from "../axiosservice";

export const HomeApi = {
    getPoints: async function () {
        return await AxiosInstance.get('purchase/points/');
    },
    getMonthlyOrder: async function(){
        return await AxiosInstance.get('purchase/monthly-list/');
    },
    getQuarterlyOrder: async function(){
        return await AxiosInstance.get('purchase/quarterly-list/');
    },
    getWeeklyOrder: async function(){
        return await AxiosInstance.get('purchase/weekly-list/');
    },
    getMonthlyPoints: async function(){
        return await AxiosInstance.get('purchase/monthly-points/');
    },
    getQuarterlyPoints: async function(){
        return await AxiosInstance.get('purchase/quarterly-points/');
    },
    getWeeklyPoints: async function(){
        return await AxiosInstance.get('purchase/weekly-points/');
    },
    getAds: async function(){
        return await AxiosInstance.get('advertisement/ads/')
    },
    getDistributorMonthlyOrder : async function(){
        return await AxiosInstance.get('purchase/distributor-monthly/')
    },
    getDistributorWeeklyOrder : async function(){
        return await AxiosInstance.get('purchase/distributor-weekly/')
    },
    getDistributorQuarterlyOrder : async function(){
        return await AxiosInstance.get('purchase/distributor-quarterly/')
    },
    getRequest : async function(){
        return await AxiosInstance.get('purchase/distributor-requests/')
    },
    getNotification : async function(){
        return await AxiosInstance.get('purchase/notification/');
    },
    getNotificationAlert: async function (){
        return await AxiosInstance.get('purchase/notification-unread/');
    },
    getNotificationUnread: async function(){
        return await AxiosInstance.post('purchase/notification-read/');
       
    }
}