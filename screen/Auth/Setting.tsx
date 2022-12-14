import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Switch, Alert, Text, ActivityIndicator} from 'react-native';
import {setAuth, setService, setUserInfo} from '../../store/slice';
import {getMyInfo, saveMyService} from '../../api/user';
import {useDispatch} from 'react-redux';
import {User} from '../../types/User';

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
const Setting = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState([false, false, false]);
  const [loading, setLoading] = useState(false);
  const toggleVal = useCallback(
    (index: number) => {
      val.splice(index, 1, !val[index]);
      setVal([...val]);
    },
    [val],
  );

  const checkService = useCallback(
    async (tweet: boolean, pray: boolean, penalty: boolean) => {
      try {
        setLoading(true);
        await saveMyService({tweet, pray, penalty});
        tweet && dispatch(setService('tweet'));
        pray && dispatch(setService('pray'));
        penalty && dispatch(setService('penalty'));
        const {
          data: {payload},
        }: {data: {payload: User}} = await getMyInfo();
        setLoading(false);
        dispatch(setUserInfo(payload));
        dispatch(setAuth(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch],
  );

  const showConfirmDialog = useCallback(() => {
    return Alert.alert(
      '?????? ??????',
      '??? ????????? ???????????? ?????????????????????. ????????????????????????? ',
      [
        // The "Yes" button
        {
          text: '???',
          onPress: () => {
            checkService(val[0], val[1], val[2]);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: '?????????',
        },
      ],
    );
  }, [checkService, val]);

  return (
    <Container>
      <Title>?????? ?????? ??????</Title>
      <SubTitle style={{marginTop: 20}}>
        Welcome to roddyisthebest's world ????
      </SubTitle>
      <SubTitle>Please select the function you want to use.</SubTitle>
      <SwitchWrapper
        style={{borderTopColor: '#ced5dc', borderTopWidth: 0.5, marginTop: 25}}>
        <SwitchColumn>
          <SwitchTitle>????????????</SwitchTitle>
          <Switch
            value={val[0]}
            onValueChange={() => {
              toggleVal(0);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          ????????????(??????) ???????????? ????????? ??? ????????????.
        </SwitchSubTitle>
      </SwitchWrapper>
      <SwitchWrapper>
        <SwitchColumn>
          <SwitchTitle>????????????</SwitchTitle>
          <Switch
            value={val[1]}
            onValueChange={() => {
              toggleVal(1);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          ??????????????? ??????????????? ?????? ??? ?????? ??? ??? ????????????.
        </SwitchSubTitle>
      </SwitchWrapper>
      <SwitchWrapper>
        <SwitchColumn>
          <SwitchTitle>??????</SwitchTitle>
          <Switch
            testID="button"
            value={val[2]}
            onValueChange={() => {
              toggleVal(2);
            }}
          />
        </SwitchColumn>
        <SwitchSubTitle>
          ?????? ??????(??????) ?????? ????????? ????????? ??? ????????????.
        </SwitchSubTitle>
      </SwitchWrapper>
      <Btn bkgColor={'#10DDC2'} onPress={showConfirmDialog} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" size={30} />
        ) : (
          <BtnText color={'white'}>??????</BtnText>
        )}
      </Btn>
      <Text testID="inputValue" style={{display: 'none'}}>
        {val[2] ? 'true' : 'false'}
      </Text>
    </Container>
  );
};

export default Setting;
