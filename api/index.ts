import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export type response = {
  payload: any;
  code: number;
  msg: string;
};

export const api = axios.create({
  baseURL: 'http://localhost:3000' as string,
});

export const setToken = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  console.log(api.defaults.headers.common.Authorization);
};
