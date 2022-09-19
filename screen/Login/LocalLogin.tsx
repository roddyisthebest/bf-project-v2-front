import React, {useCallback, useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Keyboard} from 'react-native';
import {getMyInfo, localLogin} from '../../api/user';
import {setCookie, setToken} from '../../api';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {login, setAuth, setUserInfo} from '../../store/slice';

const ContainerWrapper = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.View`
  width: 88%;
`;

const Header = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: black;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-bottom-color: #d8dfe1;
  border-bottom-width: 1px;
  color: black;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity<{dis: boolean}>`
  width: 100%;
  height: 70px;
  border-radius: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.dis ? '#D9D9D9' : '#10ddc2')};
  margin-top: 10px;
`;

const ButtonText = styled.Text<{disabled: boolean}>`
  color: ${props => (props.disabled ? '#7C7C7C' : 'white')};
  font-size: 25px;
  font-weight: 700;
`;
const LocalLogin = () => {
  const dispatch = useDispatch();
  const target = useRef<any>();

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = useCallback(
    async (userId: string, pw: string) => {
      try {
        setLoading(true);
        const {data} = await localLogin(userId, pw);
        await EncryptedStorage.setItem(
          'refreshToken',
          data.payload.token.refreshToken,
        );
        await EncryptedStorage.setItem(
          'accessToken',
          data.payload.token.accessToken,
        );

        await EncryptedStorage.setItem('tokenResource', 'local');

        await setToken();
        await setCookie('local login');

        const {data: myInfo} = await getMyInfo();
        setLoading(false);

        dispatch(setAuth(true));
        dispatch(login(true));
        dispatch(setUserInfo(myInfo.payload));
      } catch (e) {
        setLoading(false);
      }
    },
    [dispatch],
  );
  useEffect(() => {
    setDisabled(id.length === 0 || password.length === 0);
  }, [id, password]);

  return (
    <ContainerWrapper style={{flex: 1}}>
      <Container>
        <Header>LOGIN</Header>
        <Input
          placeholder="ID"
          placeholderTextColor={'#81878F'}
          value={id}
          onChangeText={(text: string) => setId(text)}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            if (target.current) {
              target.current.focus();
            }
          }}
          returnKeyType="next"
        />
        <Input
          placeholder="PW"
          placeholderTextColor={'#81878F'}
          secureTextEntry={true}
          value={password}
          onSubmitEditing={() => {
            onClick(id, password);
          }}
          onChangeText={(text: string) => setPassword(text)}
          ref={target}
        />

        <Button
          dis={disabled}
          disabled={disabled || loading}
          onPress={() => {
            onClick(id, password);
          }}>
          {loading ? (
            <ActivityIndicator color={'white'} size={30} />
          ) : (
            <ButtonText disabled={disabled}>ENTER</ButtonText>
          )}
        </Button>
      </Container>
    </ContainerWrapper>
  );
};

export default LocalLogin;
