// Lib imports
import axios from 'axios';

const api = axios.create({});

api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (
      error.response &&
      error.response.status == 403 &&
      error.response.config.url !== '/api/authentication/signin'
    ) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_id');
      setTimeout(() => window.location.reload(), 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
