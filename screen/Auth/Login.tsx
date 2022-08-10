import React from 'react';
import {Pressable, Text} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 0 30px;
`;

const TitleText = styled.Text`
  color: black;
  font-weight: 900;
  font-size: 27px;
  margin: 35px 0 50px 0;
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

const LoginText = styled.Text`
  color: black;
  font-weight: 800;
  font-size: 25px;
  margin-left: 15px;
`;
const LoginBkg = styled.Image`
  width: 25px;
  height: 25px;
`;

const Login = ({
  navigation: {navigate},
}: {
  navigation: {navigate: Function};
}) => {
  return (
    <Container>
      <TitleText>
        큰숲 청년부에서 무슨 일이 {'\n'}일어나고 있는지 알아보세요.
      </TitleText>
      <LoginBtn
        onPress={() => {
          navigate('Auth', {
            screen: 'SnsLogin',
          });
        }}>
        <LoginBkg source={require('../../assets/img/Kakao.png')} />
        <LoginText>KAKAO 로그인</LoginText>
      </LoginBtn>
      <Pressable
        onPress={() => {
          navigate('Auth', {
            screen: 'Code',
          });
        }}>
        <Text>code</Text>
      </Pressable>
    </Container>
  );
};

export default Login;
