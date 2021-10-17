// Instance Axios
import api from '@/api';

const URLS = {
  AUTH: 'auth',
};

export default {
  signIn: async (payload) => api.post(`${URLS.AUTH}/sign-in`, payload),
  signOut: async (_id) => api.post(`${URLS.AUTH}/sign-out/${_id}`),
  refresh: async () => api.post(`${URLS.AUTH}/refresh`),
};
