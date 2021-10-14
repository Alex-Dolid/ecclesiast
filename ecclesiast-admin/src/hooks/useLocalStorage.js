export const useLocalStorage = (keys) => {
  const get = (key) => {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  };
  const set = (key, payload) => localStorage.setItem(key, JSON.stringify(payload));
  const remove = (key) => localStorage.removeItem(key);
  const clearAll = () => localStorage.clear();
  const update = (key, payload) => {
    const item = get();

    if (!item) {
      return set(key, payload);
    }

    if (typeof item !== typeof payload) {
      return throw new TypeError(`You can't update ${key}! Type ${key}: ${typeof item}, but you push payload with type of ${typeof payload}`);
    }

    if (typeof payload !== 'object') {
      return set(key, payload);
    }

    if (Array.isArray(payload)) {
      return set(key, [...item, ...payload]);
    }

    return set(key, { ...item, ...payload });
  };

  const items = Object.fromEntries(
    keys.map((key) => [key, {
      data: get(key),
      get: () => get(key),
      set: (payload) => set(key, payload),
      update: (payload) => update(key, payload),
      remove: () => remove(key),
    }]),
  );

  return {
    ...items,
    get,
    set,
    update,
    remove,
    clearAll,
  };
};
