import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NotLoggedInParamList} from '../../navigation/Root';

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 0 30px;
`;

const LoginBtn = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  border: 1px solid #cdcdcd;
  border-radius: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LocalLoginBtn = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  border-radius: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
  margin: 10px 0;
`;

const LocalLoginText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 25px;
  margin-left: 15px;
`;

const LoginText = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 25px;
  margin-left: 15px;
`;
const LoginBkg = styled.Image`
  width: 25px;
  height: 25px;
`;

const Login = () => {
  const navigation = useNavigation<NavigationProp<NotLoggedInParamList>>();
  return (
    <Container>
      {/* <Input placeholder="아이디" placeholderTextColor="#000" />
      <Input
        placeholder="비밀번호"
        secureTextEntry={true}
        placeholderTextColor="#000"
      /> */}
      <LocalLoginBtn
        onPress={() => {
          navigation.navigate('LocalLogin', {});
        }}>
        <LocalLoginText>로그인</LocalLoginText>
      </LocalLoginBtn>

      <LoginBtn
        onPress={() => {
          navigation.navigate('SnsLogin', {});
        }}>
        <LoginBkg source={require('../../assets/img/Kakao.png')} />
        <LoginText>KAKAO 로그인</LoginText>
      </LoginBtn>
    </Container>
  );
};

export default Login;
