import apiClient from "./client"; 

const endpoint = "/publish"; 

const addArticle = article => {
    return apiClient.post(endpoint, article); 
}

export default {
    addArticle,
}