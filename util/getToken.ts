import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {setCookie, setToken} from '../api';
import Config from 'react-native-config';

const getTokenByRefresh = async () => {
  try {
    console.log('리프레쉬!');

    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    const resource = await EncryptedStorage.getItem('tokenResource');
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
    } = await axios.post(
      `${Config.API_URL}/token/refresh`,
      {
        refreshToken,
      },
      {
        headers: {
          Cookie: resource === 'kakao' ? '' : 'local login',
        },
      },
    );
    await EncryptedStorage.setItem('accessToken', access_token);
    await setToken();

    await setCookie(resource === 'kakao' ? '' : 'local login');

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
