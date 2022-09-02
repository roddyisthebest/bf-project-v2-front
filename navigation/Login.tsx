import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import Loginpage from '../screen/Login/Login';
import SnsLogin from '../screen/Login/SnsLogin';
const NativeStack = createNativeStackNavigator();

const Login = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTitle: () => (
        <Image
          source={require('../assets/img/Small_Logo.png')}
          style={{width: 30, height: 30}}
        />
      ),
      headerShadowVisible: false,
      contentStyle: {backgroundColor: 'white'},
      headerTitleAlign: 'center',
    }}>
    <NativeStack.Screen name="localLogin" component={Loginpage} />
    <NativeStack.Screen name="SnsLogin" component={SnsLogin} />
  </NativeStack.Navigator>
);

export default Login;
