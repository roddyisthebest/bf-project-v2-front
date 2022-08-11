import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../screen/Stack/Setting';
import Write from '../screen/Stack/Write';
import Service from '../screen/Stack/Setting/Service';
import Profile from '../screen/Stack/Setting/Profile';
import Penalty from '../screen/Stack/Detail/Penalty';
import Pray from '../screen/Stack/Detail/Pray';
import Tweets from '../screen/Stack/Detail/Tweets';
import Image from '../screen/Stack/Image';
const NativeStack = createNativeStackNavigator();

// stack에 해당되는 네비게이션 구조입니다. Edit,MyStore,MyStyle,MyReservation 페이지들이 이 네비게이션에 포함됩니다.

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: true,
      headerTitleStyle: {
        fontWeight: '700',
      },
      contentStyle: {backgroundColor: 'white'},
      presentation: 'card',
    }}>
    <NativeStack.Screen
      name="Setting"
      component={Setting}
      options={{title: '내 설정'}}
    />
    <NativeStack.Screen
      name="Service"
      component={Service}
      options={{title: '사용 기능'}}
    />
    <NativeStack.Screen
      name="Profile"
      component={Profile}
      options={{title: '프로필 수정'}}
    />
    <NativeStack.Screen
      name="Write"
      component={Write}
      options={{
        title: '글쓰기',
      }}
    />
    <NativeStack.Screen
      name="Penalty"
      component={Penalty}
      options={{title: '벌금 이력'}}
    />
    <NativeStack.Screen
      name="Pray"
      component={Pray}
      options={{title: '기도제목 이력'}}
    />
    <NativeStack.Screen
      name="Tweets"
      component={Tweets}
      options={{title: '매일성경 이력'}}
    />
    <NativeStack.Screen
      name="Image"
      component={Image}
      options={{
        headerStyle: {backgroundColor: 'black'},
        title: '',
        // title: 'hello',
        // headerTitleStyle: {
        //   color: 'white',
        // },
        header: () => null,
      }}
    />
  </NativeStack.Navigator>
);

export default Stack;
