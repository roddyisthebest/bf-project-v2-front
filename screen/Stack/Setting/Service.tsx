import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {saveMyService} from '../../../api/user';
import {initialStateProps, setService} from '../../../store/slice';

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
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const [val, setVal] = useState([false, false, false]);

  const toggleVal = useCallback(
    async (index: number) => {
      try {
        const {data} = await saveMyService({
          tweet: index === 0 ? !val[0] : val[0],
          pray: index === 1 ? !val[1] : val[1],
          penalty: index === 2 ? !val[2] : val[2],
        });
        console.log(data);
        if (index === 0) {
          dispatch(setService('tweet'));
        } else if (index === 1) {
          dispatch(setService('pray'));
        } else {
          dispatch(setService('penalty'));
        }
        val.splice(index, 1, !val[index]);
        setVal([...val]);
      } catch (e) {
        Alert.alert('에러입니다');
      }
    },
    [val, dispatch],
  );

  useEffect(() => {
    setVal([
      userInfo.Service.tweet,
      userInfo.Service.pray,
      userInfo.Service.penalty,
    ]);
  }, [userInfo]);
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
