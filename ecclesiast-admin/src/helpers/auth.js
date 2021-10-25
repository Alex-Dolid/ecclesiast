// Plugins
import { LocalStorage } from '@/plugins';

export const getToken = () => {
  const { user } = LocalStorage();

  return user.data?.token;
};

export const setToken = (token) => {
  const { user } = LocalStorage();

  user.update({ token });
};
