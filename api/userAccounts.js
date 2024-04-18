import apiClient from "./client"; 

const endpoint = "/register"; 

const addUser = user => {
    const data = new FormData(); 
    data.append('accountType', user.accountType); 
    data.append('email', user.email); 
    data.append('password', user.password); 

    return apiClient.post(endpoint, data); 
}

export default {
    addUser,
}