import React from 'react';
import styled from 'styled-components/native';
import {User} from '../types/User';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
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
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  font-size: 30px;
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

const PrayEditable = ({data, editable}: {data: User; editable: boolean}) => {
  return (
    <Container>
      <UserBtn>
        <UserImg
          source={{
            uri: data.img,
          }}
          resizeMode="cover"
          borderRadius={50}
        />
        <UserName>{data.name}</UserName>
      </UserBtn>
      {data.Pray?.map(pray => (
        <Content key={pray.id}>
          <ContentText multiline editable={editable}>
            {pray.content}
          </ContentText>
          {editable ? (
            <BtnColumn>
              <Btn backgroundColor="#EBF6FD" style={{marginRight: 7}}>
                <AwesomeIcon name="pen" color="#198CED" size={10} />
              </Btn>
              <Btn backgroundColor="#ffeaed">
                <Icon name="trash" color="red" size={10} />
              </Btn>
            </BtnColumn>
          ) : null}
        </Content>
      ))}
    </Container>
  );
};

export default PrayEditable;
