import React, {useEffect} from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import styled from 'styled-components/native';

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
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <Pressable onPress={() => {}}>
          <Text style={{color: 'blue'}}>완료</Text>
        </Pressable>
      ),
    });
  }, [setOptions]);

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
        </Column>
        <Label>이름</Label>
        <Input />
      </UserContents>
    </Container>
  );
};

export default Profile;
