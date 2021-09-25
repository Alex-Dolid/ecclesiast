// Instance Axios
import api from '@/api';

const URLS = {
  AUTH: 'auth',
};

export default {
  auth: async (payload) => api.post(URLS.AUTH, payload),
};
