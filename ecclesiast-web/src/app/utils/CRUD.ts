// Api
import api from "@/api"

type CRUDApi<P> = {
  create(payload: P): Promise<P>;
  update(id: string, payload: Partial<P>): Promise<P>;
  delete(id: string): Promise<unknown>;
  getAll(): Promise<P[]>;
  getById(id: string): Promise<P>;
};
const constructCRUDApi = <P>(name: string): CRUDApi<P> => ({
  async create(payload: P): Promise<P> {
    return await api.post(`/${name}`, payload);
  },
  async update(id: string, payload: Partial<P>): Promise<P> {
    return await api.put(`/${name}/${id}`, payload);
  },
  async delete(id: string): Promise<unknown> {
    return await api.delete(`/${name}/${id}`);
  },
  async getAll(): Promise<P[]> {
    return await api.get(`/${name}`);
  },
  async getById(id: string): Promise<P> {
    return await api.get(`/${name}/${id}`);
  },
});

export default constructCRUDApi;
