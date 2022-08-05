import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Tweets from '../screen/Tab/Tweets';
import Pray from '../screen/Tab/Pray';
import Penalty from '../screen/Tab/Penalty';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 13,
        fontWeight: '600',
        display: 'none',
      },
      headerStyle: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerShadowVisible: true,
    }}>
    <Tab.Screen
      name="Tweets"
      component={Tweets}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon
            name={color === '#8E8E8F' ? 'home-outline' : 'home'}
            size={size}
            color={'black'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Pray"
      component={Pray}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon
            name={color === '#8E8E8F' ? 'heart-outline' : 'heart'}
            color={'black'}
            size={size}
          />
        ),
        title: '',
      }}
    />
    <Tab.Screen
      name="Penalty"
      component={Penalty}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon
            name={color === '#8E8E8F' ? 'cash-outline' : 'cash'}
            color={'black'}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
