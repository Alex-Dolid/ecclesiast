export const useLocalStorage = (keys) => {
  let items = null;
  const get = (key) => {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  };
  const set = (key, payload) => localStorage.setItem(key, JSON.stringify(payload));
  const remove = (key) => {
    localStorage.removeItem(key);
    delete items[key];
  };
  const clearAll = () => {
    localStorage.clear();
    document.dispatchEvent();
    items = null;
  };
  const update = (key, payload) => {
    const item = get();

    if (!item) {
      set(key, payload);
      return payload;
    }

    if (typeof item !== typeof payload) {
      return throw new TypeError(`You can't update ${key}! Type ${key}: ${typeof item}, but
      you push payload with type of ${typeof payload}`);
    }

    if (typeof payload !== 'object') {
      set(key, payload);
      return payload;
    }

    if (Array.isArray(payload)) {
      const newData = [...item, ...payload];
      set(key, newData);
      return newData;
    }

    const newData = { ...item, ...payload };
    set(key, newData);
    return newData;
  };

  items = Object.fromEntries(
    keys.map((key) => [key, {
      data: get(key),
      get() {
        const item = get(key);
        this.data = item;
        return item;
      },
      set(payload) {
        set(key, payload);
        this.data = payload;
      },
      update(payload) {
        // eslint-disable-next-line no-useless-catch
        try {
          this.data = update(key, payload);
        } catch (error) {
          throw error;
        }
      },
      remove() {
        remove(key);
      },
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
