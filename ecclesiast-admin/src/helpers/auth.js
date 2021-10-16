// Init
import { LocalStorage } from '@/init';

export const getToken = () => {
  const { user } = LocalStorage();

  return user.data?.token;
};

export const setToken = (token) => {
  const { user } = LocalStorage();

  user.update({ token });
};
