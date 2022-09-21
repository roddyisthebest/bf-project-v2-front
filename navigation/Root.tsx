import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  initialStateProps,
  login,
  logout,
  setAuth,
  setFeed,
  setUserInfo,
} from '../store/slice';
import Auth from './Auth';
import Tabs from './Tabs';
import Stack from './Stack';
import getTokenByRefresh from '../util/getToken';
import {getMyInfo} from '../api/user';
import {User} from '../types/User';
import {api, setToken} from '../api';
import useSocket from '../hooks/useSocket';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import Login from './Login';

export type LoggedInParamList = {
  Stack: {
    screen: string;
    params: {id: number | null; uri: string | null} | null;
  };
  Tabs: {
    screen: 'Tweets' | string;
    params: {id: number | null; uri: string | null} | null;
  };
  Image: {
    params: {uri: string};
  };
  Auth: {};
};

export type NotLoggedInParamList = {
  SnsLogin: {};
  Login: {};
  LocalLogin: {};
};
const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #10ddc2;
`;

const LoadingImage = styled.Image`
  width: 100%;
`;

const Nav = createNativeStackNavigator();

const Root = () => {
  const dispatch = useDispatch();
  const [socket, disconnect] = useSocket();

  const [loading, setLoading] = useState<boolean>(true);
  const {isLoggedIn} = useSelector((state: initialStateProps) => ({
    isLoggedIn: state.isLoggedIn,
  }));
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const {isAuth} = useSelector((state: initialStateProps) => ({
    isAuth: state.isAuth,
  }));
  useEffect((): (() => void) => {
    function firstLoading() {
      return setTimeout(async () => {
        setLoading(false);
      }, 2000);
    }
    async function setPhoneToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const phoneToken = await messaging().getToken();
        return api.post('/user/phonetoken', {phoneToken});
      } catch (error: any) {}
    }
    async function getToken() {
      const data = await getTokenByRefresh();
      if (data) {
        try {
          const {
            data: {payload},
          }: {data: {payload: User}} = await getMyInfo();
          console.log(payload);
          dispatch(setAuth(true));
          dispatch(setUserInfo(payload));
          dispatch(login(true));
          setPhoneToken();
        } catch (error: any) {}
      }
      console.log(data);
    }
    getToken();
    firstLoading();

    return () => clearTimeout(firstLoading());
  }, [dispatch]);

  useEffect(() => {
    api.interceptors.response.use(
      res => {
        return res;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        console.log(error);
        if (status === 401) {
          const originalRequest = config;
          if (error.response.data.code === 'expired') {
            try {
              const refreshToken = await EncryptedStorage.getItem(
                'refreshToken',
              );
              const resource = await EncryptedStorage.getItem('tokenResource');
              if (refreshToken) {
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
                      cookie: resource === 'local' ? 'local login' : '',
                    },
                  },
                );
                originalRequest.headers.authorization = `${access_token}`;
                await EncryptedStorage.setItem('accessToken', access_token);
                setToken();
                console.log('새로고');
                return axios(originalRequest);
              } else {
                return dispatch(logout());
              }
            } catch (e: any) {
              if (e.response.status === 401) {
                Alert.alert(
                  '리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요.',
                );
              } else {
                Alert.alert('오류입니다. 다시 로그인 해주세요.');
              }
              await EncryptedStorage.clear();
              return dispatch(logout());
            }
          } else if (error.response.data.code === 'wrong information') {
          } else {
            dispatch(logout());
            return Alert.alert('권한이 없습니다.');
          }
        } else if (status === 500) {
          dispatch(logout());
        } else if (
          status === 403 &&
          error.response.data.msg ===
            '자격증명이 미이행 상태입니다. 자격증명을 해주세요.'
        ) {
          dispatch(setAuth(false));
          dispatch(login(true));
        }
        Alert.alert(error.response.data.msg);
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  useEffect(() => {
    const callback = (data: number) => {
      if (userInfo.id !== data) {
        dispatch(setFeed(true));
      }
    };
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    } else {
      socket?.on('feed-uploading', callback);
    }
    return () => {
      if (socket) {
        socket.off('feed-uploading', callback);
        console.log('on 종료');
      }
    };
  }, [isLoggedIn, disconnect, socket, userInfo.id, dispatch]);

  return loading ? (
    <LoadingContainer>
      <LoadingImage source={require('../assets/img/Loading_Logo.png')} />
    </LoadingContainer>
  ) : (
    <Nav.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      {isLoggedIn ? (
        isAuth ? (
          <>
            <Nav.Screen name="Tabs" component={Tabs} />
            <Nav.Screen name="Stack" component={Stack} />
          </>
        ) : (
          <Nav.Screen name="Auth" component={Auth} />
        )
      ) : (
        <Nav.Screen name="Login" component={Login} />
      )}
    </Nav.Navigator>
  );
};

export default Root;
