import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Penalty from './Penalty';
import Pray from './Pray';
import Tweets from './Tweets';
const Tab = createMaterialTopTabNavigator();
const Detail = ({route: {name}}: {route: {name: string}}) => {
  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <View style={{flex: 1}}>
      <Text>Detail</Text>

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#10DDC2',
          },
        }}
        initialRouteName="기도제목">
        <Tab.Screen name="매일성경" component={Tweets} />
        <Tab.Screen name="기도제목" component={Pray} />
        <Tab.Screen name="벌금" component={Penalty} />
      </Tab.Navigator>
    </View>
  );
};

export default Detail;
