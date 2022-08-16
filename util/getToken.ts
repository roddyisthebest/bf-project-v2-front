import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const getTokenByRefresh = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }
  } catch (e) {}
};
