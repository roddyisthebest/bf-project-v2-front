import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {LoggedInParamList} from '../navigation/Root';
import {PenaltyType} from '../types/Penalty';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Container = styled.View`
  padding: 25px 30px;
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

const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Key = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: black;
`;

const Value = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: #687684;
`;

const Btn = styled.TouchableOpacity<{bkgColor: string}>`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: ${props => props.bkgColor};
  align-items: center;
  justify-content: center;
`;

const PenaltyEditable = ({data}: {data: PenaltyType}) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const [check, setCheck] = useState<boolean>(true);
  useEffect(() => {
    setCheck(data.User.payed);
  }, [data]);
  return (
    <Container>
      <UserBtn
        onPress={() => {
          navigation.navigate('Tabs', {
            screen: 'Detail',
            params: {id: data.User.id},
          });
        }}>
        <UserImg
          source={{
            uri: data.User.img,
          }}
          resizeMode="cover"
          borderRadius={50}
        />
        <UserName>{data.User.name}</UserName>
      </UserBtn>
      <Column style={{marginBottom: 12.5, marginTop: 5}}>
        <Key>금액</Key>
        <Value>{data.paper}</Value>
      </Column>
      <Column>
        <Key>payed</Key>
        <Btn
          bkgColor={check ? '#DFF3F1' : '#ffeaed'}
          onPress={() => {
            setCheck(prev => !prev);
          }}>
          <Icon
            name={check ? 'checkmark-outline' : 'close-outline'}
            color={check ? '#10DDC2' : 'red'}
            size={18}
          />
        </Btn>
      </Column>
    </Container>
  );
};

export default PenaltyEditable;
