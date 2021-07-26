// Api
import biblesApi from "../api";
// Types
import { Actions, MutationsNames } from "../types";
import { BibleType } from "@/types";

const actions: Actions = { // TODO перерообити (дописати) втрачене
  createAsync: async ({ commit, state }, payload) => {
    try {
      const bible = await biblesApi.create(payload);
      const bibles = state.bibles ? [...state.bibles, bible] : [bible];
      commit(MutationsNames.setBibles, bibles);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateAsync: async ({ commit, state }, _payload) => {
    try {
      const { id, payload } = _payload;
      const bible = await biblesApi.update(id, payload);

      let bibles: BibleType[] = [];
      if (state.bibles) {
        bibles = [...state.bibles]
      }
      const currentBibleIndex = bibles.findIndex(item => item._id === bible._id);
      bibles[currentBibleIndex] = { ...bibles[currentBibleIndex], ...bible };

      commit(MutationsNames.setBibles, bibles);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default actions;
