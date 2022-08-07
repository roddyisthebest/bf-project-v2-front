import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../screen/Stack/Setting';
import Write from '../screen/Stack/Write';
import Service from '../screen/Stack/Setting/Service';
import Profile from '../screen/Stack/Setting/Profile';
import Penalty from '../screen/Stack/Detail/Penalty';
import Pray from '../screen/Stack/Detail/Pray';
import Tweets from '../screen/Stack/Detail/Tweets';
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
      presentation: 'transparentModal',
    }}>
    <NativeStack.Screen name="Setting" component={Setting} />
    <NativeStack.Screen name="Service" component={Service} />
    <NativeStack.Screen name="Profile" component={Profile} />
    <NativeStack.Screen name="Write" component={Write} />
    <NativeStack.Screen name="Penalty" component={Penalty} />
    <NativeStack.Screen name="Pray" component={Pray} />
    <NativeStack.Screen name="Tweets" component={Tweets} />
  </NativeStack.Navigator>
);

export default Stack;
