// Api
import api from "@/api"
// Types
import { Response } from "@/types";

type CRUDApi<P> = {
  create(payload: P): Response<P>;
  update(id: string, payload: Partial<P>): Response<P>;
  delete(id: string): Response<unknown>;
  getAll(): Response<P[]>;
  getById(id: string): Response<P>;
};
const constructCRUDApi = <P>(name: string): CRUDApi<P> => ({
  async create(payload: P): Response<P> {
    return await api.post(`/${name}`, payload);
  },
  async update(id: string, payload: Partial<P>): Response<P> {
    return await api.put(`/${name}/${id}`, payload);
  },
  async delete(id: string): Response<unknown> {
    return await api.delete(`/${name}/${id}`);
  },
  async getAll(): Response<P[]> {
    return await api.get(`/${name}`);
  },
  async getById(id: string): Response<P> {
    return await api.get(`/${name}/${id}`);
  },
});

export default constructCRUDApi;
