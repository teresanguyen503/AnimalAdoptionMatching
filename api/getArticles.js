import apiClient from "./client";

const endpoint = "/getArticles";

const getArticleApi = articles => {
    return apiClient.get(endpoint, articles);
}

export default {
    getArticleApi,
}