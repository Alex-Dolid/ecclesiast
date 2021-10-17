// Instance Axios
import api from '@/api';

const URLS = {
  AUTH: 'auth',
};

export default {
  signIn: async (payload) => api.post(URLS.AUTH, payload),
  refresh: async () => api.post(`${URLS.AUTH}/refresh`),
};
