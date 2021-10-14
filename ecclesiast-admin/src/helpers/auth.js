// Hooks
import { useLocalStorage } from '@/hooks';
// Constants
import { USER } from '@/constants';

export const getToken = () => {
  const { user } = useLocalStorage([USER]);

  return user.data?.token;
};

export const setToken = (token) => {
  const { user } = useLocalStorage([USER]);

  user.update({ token });
};
