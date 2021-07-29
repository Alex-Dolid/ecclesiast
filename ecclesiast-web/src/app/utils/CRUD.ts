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

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const prepareData = <P extends { [key: string]: any }>(payload: P): P => {
  const excludeProps = ["_id", "created", "modified", "__v"];
  const data = { ...payload };

  excludeProps.forEach(prop => {
    delete data[prop];
  });

  return {
    ...data
  }
};
const constructCRUDApi = <P>(name: string): CRUDApi<P> => ({
  async create(payload: P): Response<P> {
    return await api.post(`/${name}`, payload);
  },
  async update(id: string, payload: Partial<P>): Response<P> {
    return await api.put(`/${name}/${id}`, prepareData<Partial<P>>(payload));
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
