import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../navigation/Root';

const Container = styled.View`
  flex-direction: row;
  padding: 30px 0;

  padding: 30px 20px;
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
  margin-right: 7.5px;
  color: black;
`;

const SubText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #687684;
`;

const TweetImgBtn = styled.TouchableOpacity`
  margin-top: 30px;
`;

const TweetImg = styled.ImageBackground`
  flex: 1;
  height: 250px;
`;

const Input = styled.TextInput`
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #ced5dc;
  height: 80px;
  margin-top: 10px;
  color: black;
`;

const Tweet = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <Container>
      <Left>
        <UserBtn
          onPress={() => {
            navigation.navigate('Tabs', {screen: 'Detail', params: {idx: 2}});
          }}>
          <UserImg
            source={{
              uri: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
            }}
            resizeMode="contain"
            borderRadius={50}
          />
        </UserBtn>
      </Left>
      <Right>
        <Title>
          <MainText>배성연</MainText>
          <SubText>@kakao · 4 hours ago</SubText>
        </Title>
        {/* <Input
          multiline
          numberOfLines={10}
          value="wadadadadadadaa"
          editable={false}
          style={{textAlignVertical: 'top'}}
        /> */}
        <TweetImgBtn>
          <TweetImg
            source={{
              uri: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/3d281f7d-6b44-4550-ab20-856a1a8e0fc1.jpeg',
            }}
            resizeMode="cover"
            borderRadius={30}
          />
        </TweetImgBtn>
      </Right>
    </Container>
  );
};

export default Tweet;
