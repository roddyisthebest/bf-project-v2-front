import React, {useEffect} from 'react';
import {Pressable, Text} from 'react-native';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const UserBkg = styled.View`
  background-color: #d9d9d9;
`;

const UserContents = styled.View`
  padding: 0 20px 20px 20px;
  border-bottom-width: 1px;
  border-color: #ced5dc;
  margin-bottom: 20px;
`;

const Column = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: flex-end;
  position: relative;
  height: 50px;
`;

const Img = styled.Image`
  border-width: 5px;
  border-color: white;
  width: ${Dimensions.get('window').width / 4}px;
  height: ${Dimensions.get('window').width / 4}px;
  border-radius: ${Dimensions.get('window').width / 4.5}px;
  position: absolute;
  top: -${Dimensions.get('window').width / (4 * 2)}px;
  left: 0px;
`;

const SetBtn = styled.TouchableOpacity`
  border: 1px solid #cdcdcd;
  color: black;
  border-radius: 50px;
  align-items: center;
  flex-direction: row;
  padding: 5px 15px;
`;

const Info = styled.View`
  margin: 10px 0;
`;

const Name = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: black;
  margin-bottom: 5px;
`;

const SubColumn = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5.5px;
`;
const SubText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #687684;
`;

const MenuTitle = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: black;
  padding: 0 20px;
  margin-bottom: 15px;
`;

const MenuColumn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const MenuText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
  color: black;
`;

const Detail = ({
  navigation: {setOptions, goBack, navigate},
}: {
  navigation: {setOptions: Function; goBack: Function; navigate: Function};
}) => {
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            goBack();
          }}>
          <Icon name="arrow-back-outline" color="black" size={25} />
        </Pressable>
      ),
    });
  }, [setOptions, goBack]);
  return (
    <Container>
      <UserBkg style={{height: Dimensions.get('window').height / 7}} />
      <UserContents>
        <Column>
          <Img
            source={{
              uri: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
            }}
          />
          <SetBtn
            onPress={() => {
              navigate('Stack', {screen: 'Setting'});
            }}>
            <Icon name="settings" color="black" size={20} />
            <Text style={{fontWeight: '500', marginLeft: 5, color: 'black'}}>
              설정
            </Text>
          </SetBtn>
        </Column>
        <Info>
          <Name>배성연</Name>
          <SubColumn>
            <SubText>@kakao</SubText>
          </SubColumn>
          <SubColumn>
            <Icon name="calendar-outline" color="#687684" size={15} />
            <SubText> Joined March 2022</SubText>
          </SubColumn>
          <SubColumn>
            <Text style={{fontWeight: '600', marginRight: 6, color: 'black'}}>
              5
            </Text>
            <SubText style={{marginRight: 6}}>Following</SubText>
            <Text style={{fontWeight: '600', marginRight: 6, color: 'black'}}>
              5
            </Text>
            <SubText>Following</SubText>
          </SubColumn>
        </Info>
      </UserContents>
      <MenuTitle>Records</MenuTitle>
      <MenuColumn
        onPress={() => {
          navigate('Stack', {screen: 'Tweets', params: {idx: 1}});
        }}>
        <Icon name="book-outline" color="black" size={25} />
        <MenuText>매일 성경</MenuText>
      </MenuColumn>
      <MenuColumn
        onPress={() => {
          navigate('Stack', {screen: 'Pray', params: {idx: 1}});
        }}>
        <Icon name="heart-outline" color="black" size={25} />
        <MenuText>기도 제목</MenuText>
      </MenuColumn>
      <MenuColumn
        onPress={() => {
          navigate('Stack', {screen: 'Penalty', params: {idx: 1}});
        }}>
        <Icon name="cash-outline" color="black" size={25} />
        <MenuText>벌금</MenuText>
      </MenuColumn>
      {/* <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#10DDC2',
          },
          tabBarIndicatorContainerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#CED5DC',
          },
        }}
        initialRouteName="매일성경">
        <Tab.Screen name="매일성경" component={Tweets} />
        <Tab.Screen name="기도제목" component={Pray} />
        <Tab.Screen name="벌금" component={Penalty} />
      </Tab.Navigator> */}
    </Container>
  );
};

export default Detail;
