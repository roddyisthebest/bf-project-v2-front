import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getAccessTokenByRefresh} from '../api/token';
import {setToken} from '../api';

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
    } = await getAccessTokenByRefresh(refreshToken);
    await EncryptedStorage.setItem('accessToken', access_token);
    await setToken();

    return true;
  } catch (e: any) {
    if (e.response.status === 401) {
      Alert.alert('refresh토큰이 만료되었습니다. 다시 로그인해주세요.');
    } else {
      Alert.alert('에러입니다. 다시 로그인해주세요.');
    }
    return false;
  }
};

export default getTokenByRefresh;
