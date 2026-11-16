import Axios from 'axios';

export const BACKEND_URL = process.env.REACT_APP_API_URL
    || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin);

const api = Axios.create({
    baseURL: `${BACKEND_URL}/api/rea_order`
});

export default api;
