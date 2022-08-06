import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screen/Stack/Detail';
import Setting from '../screen/Stack/Setting';
import Write from '../screen/Stack/Write';
import Service from '../screen/Stack/Setting/Service';
import Profile from '../screen/Stack/Setting/Profile';

const NativeStack = createNativeStackNavigator();

// stack에 해당되는 네비게이션 구조입니다. Edit,MyStore,MyStyle,MyReservation 페이지들이 이 네비게이션에 포함됩니다.

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontWeight: '700',
      },
      contentStyle: {backgroundColor: 'white'},
    }}>
    <NativeStack.Screen
      name="Detail"
      component={Detail}
      options={{title: '유저 세부정보'}}
    />
    <NativeStack.Screen name="Setting" component={Setting} />
    <NativeStack.Screen name="Service" component={Service} />
    <NativeStack.Screen name="Profile" component={Profile} />
    <NativeStack.Screen name="Write" component={Write} />
  </NativeStack.Navigator>
);

export default Stack;
