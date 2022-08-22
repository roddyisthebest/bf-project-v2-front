import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {User} from '../types/User';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {PrayEditType} from '../types/PrayEdit';
import {Keyboard} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../navigation/Root';

const Container = styled.View`
  padding: 20px 20px 15px 20px;
  background-color: white;
`;

const UserBtn = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;
const UserImg = styled.ImageBackground`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  font-size: 22.5px;
  font-weight: 800;
  color: black;
`;

const Content = styled.View`
  padding: 20px;
  border-width: 1px;
  border-color: #ced5dc;
  border-radius: 30px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const ContentText = styled.TextInput`
  color: #141619;
  font-size: 17px;
  font-weight: 400;
  flex: 1;
  padding: 0;
`;

const BtnColumn = styled.View`
  flex-direction: row;
  align-self: flex-start;
  margin-left: 10px;
`;

const Btn = styled.TouchableOpacity<{backgroundColor: string}>`
  width: 25px;
  height: 25px;
  border-radius: 30px;
  background-color: ${props => props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const CreateBtn = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  background-color: #10ddc2;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
`;
const CreateText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: white;
`;

const CreateColumn = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
`;

const PrayEditable = ({data, editable}: {data: User; editable: boolean}) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const target = useRef<any[]>([]);

  useEffect(() => {
    data.Prays?.map(e => {
      setPrays(prev => [...prev, {...e, edit: false}]);
    });
  }, [data]);

  const [prays, setPrays] = useState<PrayEditType[]>([]);

  const deletePray = useCallback((id: number) => {
    setPrays(prev => prev?.filter(pray => pray.id !== id));
  }, []);

  const addPray = useCallback(() => {
    setPrays(prev => [
      ...prev,
      {
        id: Math.floor(Math.random() * 100000000000) + 1 + 1,
        content: '너가 과연?',
        weekend: '2022-06-02',
        edit: false,
      },
    ]);
  }, []);

  const editPray = useCallback(
    (index: number, edit: boolean) => {
      prays.splice(index, 1, {...prays[index], edit: !edit});
      setPrays([...prays]);
      // api 저장 로직
    },
    [prays],
  );

  const setContents = useCallback(
    (index: number, content: string) => {
      prays.splice(index, 1, {...prays[index], content});
      setPrays([...prays]);
    },
    [prays],
  );

  return (
    <Container>
      <UserBtn
        onPress={() => {
          navigation.navigate('Stack', {
            screen: 'Detail',
            params: {id: data.id, uri: null},
          });
        }}>
        <UserImg
          source={{
            uri: data.img,
          }}
          resizeMode="cover"
          borderRadius={50}
        />
        <UserName>{data.name}</UserName>
      </UserBtn>
      {/* <ContentText multiline ref={target} placeholder="입력" autoFocus={true} /> */}
      {prays?.map((pray, index) => (
        <Content key={pray.id}>
          <ContentText
            multiline
            returnKeyType="done"
            editable={editable && pray.edit}
            blurOnSubmit={true}
            ref={el => (target.current[index] = el)}
            onChangeText={text => setContents(index, text)}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              editPray(index, pray.edit);
            }}>
            {pray.content}
          </ContentText>

          {editable ? (
            <BtnColumn>
              {pray.edit ? (
                <Btn
                  backgroundColor="#EAFFEA"
                  style={{marginRight: 7}}
                  onPress={() => {
                    editPray(index, pray.edit);
                  }}>
                  <Icon name="save" color="#43A54D" size={10} />
                </Btn>
              ) : (
                <Btn
                  backgroundColor="#EBF6FD"
                  style={{marginRight: 7}}
                  onPress={() => {
                    editPray(index, pray.edit);
                    setTimeout(() => {
                      target.current[index].focus();
                    }, 1);
                  }}>
                  <AwesomeIcon name="pen" color="#198CED" size={10} />
                </Btn>
              )}

              <Btn
                backgroundColor="#ffeaed"
                onPress={() => {
                  deletePray(pray.id);
                }}>
                <Icon name="trash" color="red" size={10} />
              </Btn>
            </BtnColumn>
          ) : null}
        </Content>
      ))}
      {editable ? (
        <CreateColumn>
          <CreateBtn onPress={addPray}>
            <CreateText>추가하기</CreateText>
          </CreateBtn>
        </CreateColumn>
      ) : null}
    </Container>
  );
};

export default PrayEditable;
