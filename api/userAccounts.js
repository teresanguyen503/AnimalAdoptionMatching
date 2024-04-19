import apiClient from "./client"; 

const endpoint = "/register"; 

const addUser = user => {
    return apiClient.post(endpoint, user); 
}

export default {
    addUser,
}