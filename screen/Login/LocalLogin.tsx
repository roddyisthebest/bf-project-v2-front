import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {getMyInfo, localLogin} from '../../api/user';
import {setCookie, setToken} from '../../api';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {login, setAuth, setUserInfo} from '../../store/slice';

const Container = styled.SafeAreaView`
  flex: 1;

  padding: 0 20px;
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
        dispatch(setAuth(true));
        dispatch(login(true));
        dispatch(setUserInfo(myInfo.payload));
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setDisabled(id.length === 0 || password.length === 0);
    return setDisabled(id.length === 0 || password.length === 0);
  }, [id, password]);

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView extraScrollHeight={30}>
        <Container>
          <Header>로그인</Header>
          <Input
            placeholder="ID"
            placeholderTextColor={'#81878F'}
            value={id}
            onChangeText={(text: string) => setId(text)}
          />
          <Input
            placeholder="PW"
            placeholderTextColor={'#81878F'}
            secureTextEntry={true}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />

          <Button
            dis={disabled}
            disabled={disabled || loading}
            onPress={() => {
              console.log('what the hell ');
              onClick(id, password);
            }}>
            {loading ? (
              <ActivityIndicator color={'white'} size={30} />
            ) : (
              <ButtonText disabled={disabled}>ENTER</ButtonText>
            )}
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LocalLogin;
