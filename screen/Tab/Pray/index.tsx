import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View} from 'react-native';
import Creating from './Creating';
import Reading from './Reading';
const Pray = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#10DDC2',
          },
          tabBarIndicatorContainerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#CED5DC',
          },
        }}
        initialRouteName="열람하기">
        <Tab.Screen name="열람하기" component={Reading} />
        <Tab.Screen name="생성하기" component={Creating} />
      </Tab.Navigator>
    </View>
  );
};
export default Pray;
