import apiClient from "./client"; 

const endpoint = "/login"; 

const loginApi = user => {
    return apiClient.post(endpoint, user); 
}

export default {
    loginApi,
}
