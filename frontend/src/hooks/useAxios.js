import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import useAuth from './useAuth';

const useAxios = () => {
  const { user, setUser } = useAuth();

  const jwtInterceoptor = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: { Authorization: `Bearer ${user.access}` },
  });

  jwtInterceoptor.interceptors.request.use(async (config) => {
    const users = jwtDecode(user.access);
    const isExpired = dayjs.unix(users.exp).diff(dayjs()) < 1;
    console.log('isExpired: ', isExpired);

    if (!isExpired) { return config; }

    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh: JSON.parse(window.localStorage.getItem('refresh-token')),

    });

    window.localStorage.setItem('access-token', response.data.tokens.access);

    setUser({
      access: response.data.access,
    });
    config.headers.Authorization = `Bearer ${response.data.tokens.access}`;
    return config;
  });

  return jwtInterceoptor;
};

export default useAxios;