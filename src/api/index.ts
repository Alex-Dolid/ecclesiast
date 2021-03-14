// Core
import axios from "axios";
// Config
import { baseURL } from "./config";

const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default instance;
