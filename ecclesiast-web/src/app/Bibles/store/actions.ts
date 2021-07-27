// Api
import biblesApi from "../api";
// Types
import { Actions, ActionsNames, MutationsNames } from "../types";

const actions: Actions = {
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
  updateAsync: async ({ dispatch }, { id, payload }) => {
    try {
      const bible = await biblesApi.update(id, payload);

      await dispatch(ActionsNames.update, bible);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAsync: async ({ commit, state }, { id }) => {
    try {
      await biblesApi.delete(id);
      const bibles = state.bibles?.filter(item => item._id !== id);

      commit(MutationsNames.setBibles, bibles ?? null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllAsync: async ({ commit }) => {
    try {
      const bibles = await biblesApi.getAll();

      commit(MutationsNames.setBibles, bibles);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getByIdAsync: async ({ dispatch }, { id }) => {
    try {
      const bible = await biblesApi.getById(id);

      await dispatch(ActionsNames.update, bible);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: ({ commit, state: { bibles } }, bible) => {
    let newBibles = bibles ? [...bibles] : null;
    if (newBibles) {
      const currentBibleIndex = newBibles.findIndex(item => item._id === bible._id);
      if (currentBibleIndex) {
        newBibles[currentBibleIndex] = { ...newBibles[currentBibleIndex], ...bible };
      } else {
        newBibles.push(bible);
      }
    } else {
      newBibles = [bible];
    }

    commit(MutationsNames.setBibles, newBibles);
  }
};

export default actions;
