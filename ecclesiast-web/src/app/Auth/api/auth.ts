// Api
import api from "@/api";
// Types
import { User, UserAuth } from "../types";

const URL = "/auth";

export default {
  auth: async (payload: UserAuth): Promise<User> => await api.post(URL, payload),
  ping: async (): Promise<void> => await api.get(URL),
  refresh: async (): Promise<string> => await api.post(`${URL}/refresh`)
};
