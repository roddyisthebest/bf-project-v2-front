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
import {api} from '../api';
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
  useEffect(() => {
    function firstLoading() {
      return setTimeout(async () => {
        setLoading(false);
      }, 2000);
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
        } catch (e) {
          console.log(e);
        }
      }
    }
    getToken();
    firstLoading();

    // return ()=>firstLoading();
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
        console.log(status);
        if (status === 401) {
          const originalRequest = config;
          if (error.response.data.code === 'expired') {
            try {
              const refreshToken = await EncryptedStorage.getItem(
                'refreshToken',
              );
              if (refreshToken) {
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
                originalRequest.headers.authorization = `Bearer ${access_token}`;
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
              dispatch(logout());
            }
          } else {
            dispatch(logout());
            Alert.alert('권한이 없습니다.');
          }
        } else if (status === 500) {
          dispatch(logout());
          Alert.alert('서버 에러입니다. 관리자에게 문의주세요. 01051529445');
        } else {
          Alert.alert(error.response.data.msg);
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch, isAuth, isLoggedIn]);

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

  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const phoneToken = await messaging().getToken();
        console.log('phone token', phoneToken);
        return api.post(`${Config.API_URL}/user/phonetoken`, {phoneToken});
      } catch (error) {
        console.error(error);
      }
    }
    getToken();
  }, [dispatch]);

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
