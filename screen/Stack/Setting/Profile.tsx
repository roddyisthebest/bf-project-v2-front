import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Pressable, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {saveMyInfo} from '../../../api/user';
import {initialStateProps, setUserName} from '../../../store/slice';

const Container = styled.View`
  flex: 1;
`;
const UserBkg = styled.View`
  background-color: #d9d9d9;
`;

const UserContents = styled.View`
  padding: 0 20px 20px 20px;
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

const Label = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: black;
  margin: 20px 0 25px 0;
`;

const Input = styled.TextInput`
  padding: 15px 20px;
  border-width: 1px;
  border-color: #ced5dc;
  border-radius: 25px;
  font-size: 15px;
`;
const Profile = ({
  navigation: {setOptions},
}: {
  navigation: {setOptions: Function};
}) => {
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(userInfo.name);
  }, [userInfo]);

  useEffect(() => {
    setOptions({
      headerRight: () =>
        name !== userInfo.name ? (
          <Pressable
            onPress={async () => {
              await saveMyInfo(name);
              Alert.alert('성공적으로 회원님의 정보가 변경되었습니다.');
              dispatch(setUserName(name));
            }}>
            <Text style={{color: '#3478F6', fontSize: 17}}>완료</Text>
          </Pressable>
        ) : null,
    });
  }, [setOptions, name, userInfo.name, dispatch]);

  return (
    <Container>
      <UserBkg style={{height: Dimensions.get('window').height / 7}} />
      <UserContents>
        <Column>
          <Img
            source={{
              uri: userInfo.img,
            }}
          />
        </Column>
        <Label>이름</Label>
        <Input
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
      </UserContents>
    </Container>
  );
};

export default Profile;
