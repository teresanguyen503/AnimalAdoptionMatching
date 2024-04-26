import apiClient from "./client"; 

const endpoint = "/reset-password"; 

const resetPasswordApi = email => {
    return apiClient.post(endpoint, resetPasswordApi); 
}

export default {
    resetPasswordApi,
}
