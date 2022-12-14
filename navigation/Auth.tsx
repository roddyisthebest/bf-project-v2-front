import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import Code from '../screen/Auth/Code';
import Setting from '../screen/Auth/Setting';
const NativeStack = createNativeStackNavigator();

const Auth = () => (
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
    <NativeStack.Screen name="Code" component={Code} />
    <NativeStack.Screen name="Setting" component={Setting} />
  </NativeStack.Navigator>
);

export default Auth;
