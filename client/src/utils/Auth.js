
import api from './api';

const Auth = {
    isAuthenticated: false,
    client_id: 0,
    token: '',

    async check() {
        try {
            const getToken = window.localStorage.getItem('token');

            // No token found
            if (!getToken) {
                this.isAuthenticated = false;
                this.client_id = 0;
                this.token = '';
                return;
            }

            const response = await api.post('/verify', { token: getToken });

            this.isAuthenticated = response.data.response;
            this.client_id = response.data.client_id;
            this.token = response.data.token;

        } catch (error) {
            console.error('Authentication check failed:', error.response?.data || error.message);

            this.isAuthenticated = false;
            this.client_id = 0;
            this.token = '';
        }
    },

    getToken() {
        return this.token;
    },

    getAuth() {
        return this.isAuthenticated;
    },

    getClientId() {
        return this.client_id;
    }
};

export default Auth;
