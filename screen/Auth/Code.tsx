import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {TextInput, Platform, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {authCode} from '../../api/user';

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 800;
  color: black;
  margin-top: 20px;
`;

const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #687684;
`;

const CellWrapper = styled.View`
  margin: 40px 0;
  flex-direction: row;
`;

const Cell = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: white;
  box-shadow: ${Platform.OS === 'android'
    ? '0 0 0 black '
    : '0px 0px 4px #00000054'};

  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 10px;
`;

const Block = styled.View`
  width: 1px;
  height: 20px;
  background-color: blue;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #10ddc2;
  border-radius: 10px;
`;

const Btn = styled.Pressable<{bkgColor: string}>`
  width: 95px;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${props => props.bkgColor};
`;

const BtnText = styled.Text<{color: string}>`
  font-size: 15px;
  color: ${props => props.color};
  font-weight: 700;
`;
const Code = ({navigation: {dispatch}}: {navigation: {dispatch: Function}}) => {
  const [val, setVal] = useState('');
  const input = useRef<any>();

  useEffect(() => {
    if (val.length === 6) {
      input.current.blur();
    }
  }, [val]);

  const focus = useCallback(() => {
    input.current.focus();
  }, []);

  const submit = useCallback(async () => {
    try {
      await authCode(val);
      return dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Setting'}],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, val]);

  return (
    <Container>
      <Title>6자리 코드입력</Title>
      <SubTitle style={{marginTop: 20}}>
        This app provides private content.
      </SubTitle>
      <SubTitle>Please enter a 6-digit code to prove yourself.</SubTitle>
      <CellWrapper>
        <Cell style={{marginRight: 5, elevation: 8}} onPress={focus}>
          {val.length === 0 ? <Block /> : val[0] ? <Dot /> : null}
        </Cell>
        <Cell style={{marginHorizontal: 5, elevation: 8}} onPress={focus}>
          {val.length === 1 ? <Block /> : val[1] ? <Dot /> : null}
        </Cell>
        <Cell style={{marginHorizontal: 5, elevation: 8}} onPress={focus}>
          {val.length === 2 ? <Block /> : val[2] ? <Dot /> : null}
        </Cell>
        <Cell style={{marginHorizontal: 5, elevation: 8}} onPress={focus}>
          {val.length === 3 ? <Block /> : val[3] ? <Dot /> : null}
        </Cell>
        <Cell style={{marginHorizontal: 5, elevation: 8}} onPress={focus}>
          {val.length === 4 ? <Block /> : val[4] ? <Dot /> : null}
        </Cell>
        <Cell style={{marginLeft: 5, elevation: 8}} onPress={focus}>
          {val.length === 5 ? <Block /> : val[5] ? <Dot /> : null}
        </Cell>
        <TextInput
          keyboardType="number-pad"
          ref={input}
          style={{opacity: 0, position: 'absolute'}}
          value={val}
          onChangeText={(text: string) => {
            if (text.length < 7) {
              return setVal(text);
            }
            input.current.blur();
          }}
          returnKeyType="go"
          autoFocus
        />
      </CellWrapper>
      <Btn
        bkgColor={val.length === 6 ? '#10DDC2' : 'lightgray'}
        onPress={submit}
        disabled={val.length !== 6}>
        <BtnText color={val.length === 6 ? 'white' : '#6f6f6f'}>VERIFY</BtnText>
      </Btn>
    </Container>
  );
};

export default Code;
