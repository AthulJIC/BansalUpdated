import AxiosInstance from "../axiosservice";

// export const BookMarkService = async (itemId) => {
// //console.log("bookmark itemID",itemId)
//     const requestBody = {
//         distributor:itemId,
//     };
//     //console.log("requestBody BookMarkService ",requestBody)
//     try {
//         const response = await AxiosInstance.post('/account/bookmark/',requestBody);
//         //console.log("BookMarkService response",response)
//         return response.data;
//     } catch (error) {
//         //console.error('bookmark Error:', error);
//         throw error;
//     }
// };
// export const BookMarkDeleteService = async (Id) => {
//  //console.log(Id,'k')
//     const requestBody = {
//         distributor:"",
//     };
//    // console.log("requestBody",requestBody)
//     try {
//         const response = await AxiosInstance.delete('/account/bookmark-delete/'+Id+
//         '/');
//         //console.log("BookMarkDeleteService response",response)
//         return response.data;
//     } catch (error) {
//         //console.error('BookMarkDeleteService Error:', error);
//         throw error;
//     }
// };
// export const BookMarkListService = async (itemId) => {
//     //console.log("bookmark itemId",itemId)
//     try {
//         const response = await AxiosInstance.get('/account/bookmark-list/');
//         // console.log("BookMarkListService response",response)
//         return response;
//     } catch (error) {
//        // console.error('bookmark Error:', error);
//         throw error;
//     }
// };

export const BookMarkApi = {
    getBookMarkList: async function () {
        return await AxiosInstance.get('account/bookmark-list/')
    },
    addBookMark : async function(data){
        return await AxiosInstance.post('account/bookmark/',data)
    },
    deleteBookMark: async function(params){
        return await AxiosInstance.delete('account/bookmark-delete/'+params+'/')
    },
}