import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Tweets from '../screen/Tab/Tweets';
import Pray from '../screen/Tab/Pray';
import Penalty from '../screen/Tab/Penalty';
import {Image, TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 7,
      },
      headerStyle: {
        borderBottomColor: '#BDC5CD',
        borderBottomWidth: 0.5,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTitleAlign: 'center',
      headerShadowVisible: true,
      tabBarIconStyle: {
        marginTop: 5,
      },
      tabBarActiveTintColor: '#10DDC2',
      tabBarInactiveTintColor: '#687684',
      tabBarStyle: {
        borderTopColor: '#BDC5CD',
        borderTopWidth: 0.5,
      },
      headerLeftContainerStyle: {
        paddingLeft: 30,
      },
      headerRightContainerStyle: {
        paddingRight: 30,
      },
      headerTitle: () => (
        <Image
          source={require('../assets/img/Small_Logo.png')}
          style={{width: 30, height: 30}}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
            }}
            style={{width: 30, height: 30, borderRadius: 30}}
          />
        </TouchableOpacity>
      ),
    }}>
    <Tab.Screen
      name="Tweets"
      component={Tweets}
      options={{
        tabBarIcon: ({color}) => (
          <Icon
            name={color === '#687684' ? 'home-outline' : 'home'}
            color={color === '#687684' ? '#687684' : '#10DDC2'}
            size={20}
          />
        ),
        title: 'Home',
      }}
    />
    <Tab.Screen
      name="Pray"
      component={Pray}
      options={{
        tabBarIcon: ({color}) => (
          <Icon
            name={color === '#687684' ? 'heart-outline' : 'heart'}
            color={color === '#687684' ? '#687684' : '#10DDC2'}
            size={20}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Penalty"
      component={Penalty}
      options={{
        tabBarIcon: ({color}) => (
          <Icon
            name={color === '#687684' ? 'cash-outline' : 'cash'}
            color={color === '#687684' ? '#687684' : '#10DDC2'}
            size={20}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
