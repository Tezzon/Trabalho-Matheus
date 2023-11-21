import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: "http://localhost/api/"
});

export default axiosConfig;