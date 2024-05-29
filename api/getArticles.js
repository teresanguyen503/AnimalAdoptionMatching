import apiClient from "./client";

const endpoint = "/getArticles";

const getArticlesApi = articles => {
    return apiClient.get(endpoint, articles);
}

export default {
    getArticlesApi,
}