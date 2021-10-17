// Core
import axios from 'axios';
// Api
import api from '@/store/api';
// Store
import store from '@/store';
// Router
import router from '@/router';
// Helpers
import { getToken, setToken } from '@/helpers';
// Init
import { LocalStorage } from '@/init';
// Constants
import { PAGES } from '@/router/constants';
// Config
import { baseURL, timeout, headers } from './config';
// External
import { Statuses } from '../../../ecclesiast-api/external';

const instance = axios.create({ baseURL, timeout, headers });

instance.interceptors.request.use((_request) => {
  const token = getToken();
  const request = _request;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

let isRefreshingToken = false;
let reqQueue = [];

const processQueue = (err) => {
  reqQueue.forEach((req) => (err ? req.reject(err) : req.resolve()));
  reqQueue = [];
};

instance.interceptors.response.use((response) => response.data, (error) => {
  const originalRequest = error.config;
  const { status } = error.response ?? error;

  if (status === Statuses.Unauthorized && !originalRequest._retry) {
    if (isRefreshingToken) {
      return new Promise((resolve, reject) => reqQueue.push({ resolve, reject }))
        .then(() => instance(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshingToken = true;

    return new Promise(((resolve, reject) => {
      api.refresh()
        .then((data) => {
          setToken(data.token);
          processQueue(null);
          resolve(instance(originalRequest));
        })
        .catch((err) => {
          processQueue(err);
          reject(err);
        })
        .finally(() => {
          isRefreshingToken = false;
        });
    }));
  }

  if (status === Statuses.Forbidden) {
    const { clearAll } = LocalStorage();
    clearAll();
    store.dispatch('clear');
    router.push({ name: PAGES.LOGIN.name });
  }

  throw error;
});

export default instance;
