import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 
                import.meta.env.REACT_APP_API_URL || 
                'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});


export default axiosInstance;