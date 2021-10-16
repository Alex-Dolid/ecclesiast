// Hooks
import { useLocalStorage } from '@/hooks';
// Constants
import { LOCAL_USER } from '@/constants';

const LocalStorage = () => useLocalStorage([LOCAL_USER]);

export default LocalStorage;
