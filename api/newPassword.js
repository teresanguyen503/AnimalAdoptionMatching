import apiClient from "./client"; 

const endpoint = "/new-password"; 

const newPasswordApi = (password, email) => {
    const values = {password, email}
    JSON.stringify(values); 
    return apiClient.post(endpoint, values); 
}

export default {
    newPasswordApi,
}