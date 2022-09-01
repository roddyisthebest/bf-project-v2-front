import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
export type response = {
  payload: any;
  code: number;
  msg: string;
};
export const api = axios.create({
  baseURL: 'https://api.bf-church.click' as string,
});

export const setToken = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
