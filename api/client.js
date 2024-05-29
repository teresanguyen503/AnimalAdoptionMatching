import { create } from 'apisauce'; 

const apiClient = create({
    baseURL: 'http://192.168.254.23:3000'
}); 

export default apiClient; 