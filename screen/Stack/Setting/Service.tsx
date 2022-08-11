import React, {useCallback, useState} from 'react';
import {View, Text, Switch} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
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
  align-items: flex-start;
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

const Profile = () => {
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
      <SwitchWrapper>
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
    </Container>
  );
};

export default Profile;
