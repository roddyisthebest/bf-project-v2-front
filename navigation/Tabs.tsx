import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Tweets from '../screen/Tab/Tweets';
import Pray from '../screen/Tab/Pray';
import Penalty from '../screen/Tab/Penalty';
import {TouchableOpacity, Platform, Image} from 'react-native';
import styled from 'styled-components/native';
import {initialStateProps, logout} from '../store/slice';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import {logoutNode} from '../api/user';
const Btn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: #10ddc2;
  position: absolute;
  right: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;

const Navigation = styled.View`
  position: absolute;
  top: ${Platform.OS === 'android' ? '50px' : '90px'};
  left: 20px;
  background-color: white;
  z-index: 100;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const Item = styled.View`
  padding: 0px 20px;
  flex: 1;
`;

const NavBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 50px;
`;

const NavBtnText = styled.Text<{color: string}>`
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.color};
`;

const Tab = createBottomTabNavigator();

const Tabs = ({
  navigation: {navigate},
}: {
  navigation: {navigate: Function; dispatch: Function};
}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const {newFeed} = useSelector((state: initialStateProps) => ({
    newFeed: state.newFeed,
  }));
  const [visible, setVisible] = useState(false);
  return (
    <>
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
            <TouchableOpacity
              onPress={() => {
                setVisible(prev => !prev);
              }}>
              {userInfo.img.length !== 0 ? (
                <Image
                  source={{
                    uri: userInfo && userInfo.img,
                  }}
                  style={{width: 30, height: 30, borderRadius: 30}}
                />
              ) : (
                <Image
                  source={require('../assets/img/loading.png')}
                  style={{width: 30, height: 30, borderRadius: 30}}
                />
              )}
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
            tabBarBadge: newFeed === 0 ? undefined : newFeed,
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
      {visible ? (
        <Navigation
          style={{
            elevation: 8,
            shadowColor: Platform.OS === 'android' ? '#000000' : '#00000060',
          }}>
          <Item>
            <NavBtn
              onPress={() => {
                navigate('Stack', {
                  screen: 'Detail',
                  params: {id: userInfo.id},
                });
                setVisible(false);
              }}>
              <Icon name="person-circle-outline" color="black" size={18} />
              <NavBtnText color="black">내 정보</NavBtnText>
            </NavBtn>
          </Item>
          <Item style={{borderTopWidth: 1, borderTopColor: 'lightgray'}}>
            <NavBtn
              onPress={async () => {
                try {
                  dispatch(logout());
                  await logoutNode();
                  await EncryptedStorage.clear();
                } catch (e) {
                  console.log(e);
                }
              }}>
              <Icon name="log-out-outline" color="red" size={15} />
              <NavBtnText color="red">로그아웃</NavBtnText>
            </NavBtn>
          </Item>
        </Navigation>
      ) : null}

      <Btn
        style={{
          elevation: 8,
          shadowColor: Platform.OS === 'android' ? '#000000' : '#00000060',
          bottom: Platform.OS === 'android' ? 90 : 120,
        }}
        onPress={() => {
          navigate('Stack', {screen: 'Write'});
        }}>
        <FontAwesome5Icon name="pen" color="white" size={25} />
      </Btn>
    </>
  );
};

export default Tabs;
