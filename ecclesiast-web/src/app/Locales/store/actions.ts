// Api
import localesApi from "../api";
// Types
import { Actions, ActionsNames, MutationsNames } from "../types";

const actions: Actions = {
  createAsync: async ({ commit, state }, payload) => {
    try {
      const locale = await localesApi.create(payload);
      const locales = state.locales ? [...state.locales, locale] : [locale];
      commit(MutationsNames.setLocales, locales);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateAsync: async ({ dispatch }, { id, payload }) => {
    try {
      const locale = await localesApi.update(id, payload);

      await dispatch(ActionsNames.update, locale);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAsync: async ({ commit, state }, { id }) => {
    try {
      await localesApi.delete(id);
      const locales = state.locales?.filter(item => item._id !== id);

      commit(MutationsNames.setLocales, locales ?? null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllAsync: async ({ commit }) => {
    try {
      const locales = await localesApi.getAll();

      commit(MutationsNames.setLocales, locales);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getByIdAsync: async ({ dispatch }, { id }) => {
    try {
      const locale = await localesApi.getById(id);

      await dispatch(ActionsNames.update, locale);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: ({ commit, state: { locales } }, locale) => {
    let newBibles = locales ? [...locales] : null;
    if (newBibles) {
      const currentBibleIndex = newBibles.findIndex(item => item._id === locale._id);
      if (currentBibleIndex) {
        newBibles[currentBibleIndex] = { ...newBibles[currentBibleIndex], ...locale };
      } else {
        newBibles.push(locale);
      }
    } else {
      newBibles = [locale];
    }

    commit(MutationsNames.setLocales, newBibles);
  }
};

export default actions;
