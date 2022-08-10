import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Switch} from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
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

const SwitchWrapper = styled.View`
  padding: 25px 40px;
  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: #ced5dc;
`;

const SwitchColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SwitchTitle = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: 800;
`;

const SwitchSubTitle = styled.Text`
  color: #687684;
  font-size: 12px;
  font-weight: 400;
`;

const Btn = styled.Pressable<{bkgColor: string}>`
  width: 95px;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${props => props.bkgColor};
  margin-top: 30px;
`;

const BtnText = styled.Text<{color: string}>`
  font-size: 15px;
  color: ${props => props.color};
  font-weight: 700;
`;
const Code = ({navigation: {dispatch}}: {navigation: {dispatch: Function}}) => {
  const [val, setVal] = useState([false, false, false]);
  const toggleVal = useCallback(
    (index: number) => {
      val.splice(index, 1, !val[index]);
      setVal([...val]);
    },
    [val],
  );
  return (
    <Container>
      <Title>기능 사용 설정</Title>
      <SubTitle style={{marginTop: 20}}>
        Welcome to roddyisthebest's world 🔥
      </SubTitle>
      <SubTitle>Please select the function you want to use.</SubTitle>
      <SwitchWrapper
        style={{borderTopColor: '#ced5dc', borderTopWidth: 0.5, marginTop: 25}}>
        <SwitchColumn>
          <SwitchTitle>매일성경</SwitchTitle>
          <Switch
            value={val[0]}
            onValueChange={() => {
              toggleVal(0);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          매일성경(큐티) 업로드를 사용할 수 있습니다.
        </SwitchSubTitle>
      </SwitchWrapper>
      <SwitchWrapper>
        <SwitchColumn>
          <SwitchTitle>기도제목</SwitchTitle>
          <Switch
            value={val[1]}
            onValueChange={() => {
              toggleVal(1);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          기도제목을 업로드하고 수정 및 삭제 할 수 있습니다.
        </SwitchSubTitle>
      </SwitchWrapper>
      <SwitchWrapper>
        <SwitchColumn>
          <SwitchTitle>벌금</SwitchTitle>
          <Switch
            value={val[2]}
            onValueChange={() => {
              toggleVal(2);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          매일 성경(큐티) 벌금 로직에 참여할 수 있습니다.
        </SwitchSubTitle>
      </SwitchWrapper>
      <Btn bkgColor={'#10DDC2'}>
        <BtnText color={'white'}>확인</BtnText>
      </Btn>
    </Container>
  );
};

export default Code;
