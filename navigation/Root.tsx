import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {initialStateProps, login, setFeed, setUserInfo} from '../store/slice';
import Auth from './Auth';
import Tabs from './Tabs';
import Stack from './Stack';
import getTokenByRefresh from '../util/getToken';
import {getMyInfo} from '../api/user';
import {User} from '../types/User';
import {api} from '../api';
import useSocket from '../hooks/useSocket';

export type LoggedInParamList = {
  Stack: {
    screen: string;
    params: {id: number | null; uri: string | null};
  };
  Tabs: {
    screen: string;
    params: {id: number | null; uri: string | null};
  };
  Image: {
    params: {uri: string};
  };
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
  useEffect(() => {
    function firstLoading() {
      return setTimeout(() => {
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
          dispatch(setUserInfo(payload));
        } catch (e) {
          console.log(e);
        } finally {
          dispatch(login(true));
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
        console.log('다 여기를 지나간다!');
        return res;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        console.log(config, status);
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    const callback = (data: {id: number}) => {
      // if (userInfo.id !== data.id) {
      //   dispatch(setFeed(true));
      // }

      dispatch(setFeed(true));
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
        <>
          <Nav.Screen name="Tabs" component={Tabs} />
          <Nav.Screen name="Stack" component={Stack} />
        </>
      ) : (
        <Nav.Screen name="Auth" component={Auth} />
      )}
    </Nav.Navigator>
  );
};

export default Root;
