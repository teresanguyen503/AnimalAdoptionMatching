import apiClient from "./client";

const endpoint = "/getPet";

const petProfileApi = petProfile => {
    return apiClient.get(endpoint, petProfile);
}

export default {
    petProfileApi,
}
