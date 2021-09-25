// Core
import axios from 'axios';
// Helpers
import { getToken, setToken } from '@/helpers';
// Constants
import { PAGES } from '@/router/constants';

const instance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((_request) => {
  const token = getToken();
  const request = _request;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

instance.interceptors.response.use((response) => response.data, (error) => {
  const { status } = error.response ?? error;

  if (status === 401 || status === 403) {
    setToken(null);
    // eslint-disable-next-line no-alert
    alert('Token expired!');
    this.$router.push({ name: PAGES.LOGIN.name });
  }
});

export default instance;
