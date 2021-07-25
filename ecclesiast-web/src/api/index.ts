// Core
import axios from "axios";
// Router
import { useRouter } from "vue-router";
// Store
import { useStore } from "vuex";
// Api
import authApi from "@/app/Auth/api"
// Helpers
import { setToken, getToken } from "@/app/Auth";
// Config
import { baseURL } from "./config";
// Types
import { ResponseStatus, RootState } from "@/types";
import { RoutesNames } from "@/router";

const router = useRouter();
const store = useStore<RootState>();

const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  }
});

instance.interceptors.request.use((request) => {
  const token = getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

let isRefreshingToken = false;
let reqQueue: PromiseConstructor[] = [];

const processQueue = (err: Error | null): void => {
  reqQueue.forEach((req) => (err ? req.reject(err) : req.resolve()));
  reqQueue = [];
};

instance.interceptors.response.use(response => response, error => {
  const originalRequest = error.config;
  const { status } = error.response;

  if (status === ResponseStatus.Unauthorized && !originalRequest._retry) {

    if (isRefreshingToken) {
      return new Promise( (resolve, reject) => reqQueue.push({ resolve, reject } as PromiseConstructor))
        .then(() => instance(originalRequest))
        .catch(err => Promise.reject(err))
    }

    originalRequest._retry = true;
    isRefreshingToken = true;

    return new Promise(function (resolve, reject) {
      authApi.refresh()
        .then((data) => {
          setToken(data);
          processQueue(null);
          resolve(instance(originalRequest));
        })
        .catch((err) => {
          processQueue(err);
          reject(err);
        })
        .finally(() => {
          isRefreshingToken = false
        })
    })
  } else if (status === ResponseStatus.BadToken) {
    localStorage.clear();
    store.dispatch("auth/clear");
    router.push(RoutesNames.SignIn);
  }

  throw error;
})

export default instance;
