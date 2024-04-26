import apiClient from "./client"; 

const endpoint = "/reset-password"; 

const resetPasswordApi = email => {
    return apiClient.post(endpoint, email); 
}

export default {
    resetPasswordApi,
}
