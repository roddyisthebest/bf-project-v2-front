import React, {useCallback, useEffect, useRef, useState, memo} from 'react';
import styled from 'styled-components/native';
import {User} from '../types/User';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {PrayEditType} from '../types/PrayEdit';
import {ActivityIndicator, Alert, Keyboard} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../navigation/Root';
import {deletePray, postPray, updatePray} from '../api/pray';

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

const PrayEditable = memo(
  ({data, editable}: {data: User; editable: boolean}) => {
    const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

    const target = useRef<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      data.Prays?.map(e => {
        setPrays(prev => [
          ...prev,
          {...e, edit: false, editLoading: false, deleteLoading: false},
        ]);
      });
    }, [data]);

    const [prays, setPrays] = useState<PrayEditType[]>([]);

    const delPray = useCallback(
      async (index: number, id: number) => {
        prays.splice(index, 1, {...prays[index], deleteLoading: true});
        setPrays([...prays]);
        try {
          await deletePray(id);
          setPrays(prev => prev?.filter(pray => pray.id !== id));
        } catch (e) {
          prays.splice(index, 1, {...prays[index], deleteLoading: false});
          setPrays([...prays]);
        }
      },
      [prays],
    );

    const addPray = useCallback(async (id: number) => {
      try {
        setLoading(true);
        const {
          data: {payload},
        } = await postPray(id);
        setPrays(prev => [
          ...prev,
          {
            id: payload.id,
            content: payload.content,
            weekend: payload.weekend,
            edit: false,
            editLoading: false,
            deleteLoading: false,
          },
        ]);
      } catch (e) {
        Alert.alert('에러입니다.');
      } finally {
        setLoading(false);
      }
    }, []);

    const editPray = useCallback(
      async (index: number, id: number, userId: number, edit: boolean) => {
        prays.splice(index, 1, {...prays[index], editLoading: true});
        setPrays([...prays]);
        try {
          await updatePray(id, userId, prays[index].content);
        } catch (e) {
          Alert.alert('에러입니다.');
        } finally {
          prays.splice(index, 1, {
            ...prays[index],
            editLoading: false,
            edit: !edit,
          });
          setPrays([...prays]);
        }

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
                editPray(index, pray.id, data.id, pray.edit);
              }}>
              {pray.content}
            </ContentText>

            {editable ? (
              <BtnColumn>
                {pray.edit ? (
                  <Btn
                    disabled={pray.editLoading}
                    backgroundColor="#EAFFEA"
                    style={{marginRight: 7}}
                    onPress={() => {
                      editPray(index, pray.id, data.id, pray.edit);
                    }}>
                    {pray.editLoading ? (
                      <ActivityIndicator color="#43A54D" size={10} />
                    ) : (
                      <Icon name="save" color="#43A54D" size={10} />
                    )}
                  </Btn>
                ) : (
                  <Btn
                    backgroundColor="#EBF6FD"
                    style={{marginRight: 7}}
                    onPress={async () => {
                      prays.splice(index, 1, {
                        ...prays[index],
                        edit: true,
                      });
                      setPrays([...prays]);
                      setTimeout(() => {
                        target.current[index].focus();
                      }, 1);
                    }}>
                    <AwesomeIcon name="pen" color="#198CED" size={10} />
                  </Btn>
                )}

                <Btn
                  disabled={pray.deleteLoading}
                  backgroundColor="#ffeaed"
                  onPress={() => {
                    delPray(index, pray.id);
                  }}>
                  {pray.deleteLoading ? (
                    <ActivityIndicator color="red" size={10} />
                  ) : (
                    <Icon name="trash" color="red" size={10} />
                  )}
                </Btn>
              </BtnColumn>
            ) : null}
          </Content>
        ))}
        {editable ? (
          <CreateColumn>
            <CreateBtn
              onPress={() => {
                addPray(data.id);
              }}>
              {loading ? (
                <ActivityIndicator color="white" size={12} />
              ) : (
                <CreateText>추가하기</CreateText>
              )}
            </CreateBtn>
          </CreateColumn>
        ) : null}
      </Container>
    );
  },
);

export default PrayEditable;
