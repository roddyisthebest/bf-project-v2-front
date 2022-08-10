import React, {useState} from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../navigation/Root';
import {TweetType} from '../types/Tweet';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {initialStateProps} from '../store/slice';

const Container = styled.View`
  flex-direction: row;
  padding: 40px 20px 0 20px;
`;

const Left = styled.View`
  width: 50px;
  margin-right: 20px;
`;

const UserBtn = styled.Pressable`
  border: 1px solid #eff5fb;
  width: 52px;
  border-radius: 50px;
`;

const UserImg = styled.ImageBackground`
  width: 50px;
  height: 50px;
`;

const Right = styled.View`
  flex: 1;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
`;

const SubText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #687684;
  margin: 0 7.5px;
`;

const TweetImgBtn = styled.TouchableOpacity`
  margin-top: 30px;
  border-width: 0.5px;
  border-color: #e5e5e5;
  border-radius: 30px;
`;

const TweetImg = styled.ImageBackground`
  flex: 1;
  height: 280px;
`;

const Input = styled.TextInput`
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #ced5dc;
  height: 80px;
  margin-top: 10px;
  color: black;
`;

const DelBtn = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: #ffeaed;
  border-radius: 10px;
`;

const Tweet = ({data, del}: {data: TweetType; del: Function}) => {
  const [resize, setResize] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));
  return (
    <Container style={{minHeight: data.content.length !== 0 ? 510 : 420}}>
      <Left>
        <UserBtn
          onPress={() => {
            navigation.navigate('Tabs', {
              screen: 'Detail',
              params: {id: data.User.id, uri: null},
            });
          }}>
          <UserImg
            source={{
              uri: data.User.img,
            }}
            resizeMode="cover"
            borderRadius={50}
          />
        </UserBtn>
      </Left>
      <Right>
        <Title>
          <MainText>{data.User.name}</MainText>
          <SubText>@kakao · 4 hours ago</SubText>
          {userInfo.id === data.id ? (
            <DelBtn
              onPress={() => {
                del(data.id);
              }}>
              <Text style={{fontSize: 10, color: 'red'}}>삭제하기</Text>
            </DelBtn>
          ) : null}
        </Title>
        {data.content.length !== 0 ? (
          <Input
            multiline
            numberOfLines={10}
            value={data.content}
            editable={false}
            style={{textAlignVertical: 'top'}}
          />
        ) : null}

        <TweetImgBtn
          onPress={() => {
            setResize(prev => !prev);
          }}
          onLongPress={() => {
            navigation.navigate('Stack', {
              screen: 'Image',
              params: {uri: data.img, id: null},
            });
          }}>
          <TweetImg
            source={{
              uri: data.img,
            }}
            resizeMode={resize ? 'cover' : 'contain'}
            borderRadius={30}
            defaultSource={require('../assets/img/loading.png')}
          />
        </TweetImgBtn>
      </Right>
    </Container>
  );
};

export default Tweet;
