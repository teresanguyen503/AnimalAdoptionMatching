import apiClient from "./client"; 

const endpoint = "/new-password"; 

const newPasswordApi = (password, email) => {
    const values = (pass, email)
    return apiClient.post(endpoint, values); 
}

export default {
    newPasswordApi,
}