import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {initialStateProps} from '../store/slice';
import Auth from './Auth';
import Tabs from './Tabs';
import Stack from './Stack';
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const {isLoggedIn} = useSelector((state: initialStateProps) => ({
    isLoggedIn: state.isLoggedIn,
  }));
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
          <Nav.Screen name="Stack" component={Stack} />
          <Nav.Screen name="Tabs" component={Tabs} />
        </>
      ) : (
        <Nav.Screen name="Auth" component={Auth} />
      )}
    </Nav.Navigator>
  );
};

export default Root;
