// Api
import api from "@/api"

type CRUDApi<P> = {
  create(payload: P): Promise<P>;
  update(id: string, payload: Partial<P>): Promise<P>;
  delete(id: string): Promise<unknown>
  get(id?: string): Promise<P | P[]>
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
  async get(id?: string): Promise<P | P[]> {
    return await api.get(!id ? `/${name}` : `/${name}/${id}`);
  },
});

export default constructCRUDApi;
