import axios from 'axios';
// config

const BASE_URL = 'https://trendryol-api-main-production.up.railway.app';
const BASE_URL = 'https://trendryol-api-main-production.up.railway.app';


// const BASE_URL = 'http://localhost:8000';

// ----------------------------------------------------------------------
 
const axiosInstance = axios.create({ baseURL: BASE_URL });  

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
