import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {setToken} from '../api';
import Config from 'react-native-config';

const getTokenByRefresh = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }
    const {
      data: {
        payload: {access_token},
      },
    }: {
      data: {
        payload: {access_token: string};
      };
    } = await axios.post(`${Config.API_URL}/token/refresh`, {
      refreshToken,
    });
    console.log(access_token);
    await EncryptedStorage.setItem('accessToken', access_token);
    await setToken();

    return true;
  } catch (e: any) {
    if (e.response.status === 401) {
      Alert.alert('refresh토큰이 만료되었습니다. 다시 로그인해주세요.');
    } else {
      Alert.alert('오류입니다. 다시 로그인해주세요.');
    }
    return false;
  }
};

export default getTokenByRefresh;
