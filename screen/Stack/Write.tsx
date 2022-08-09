import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../navigation/Root';
import {TweetType} from '../../types/Tweet';
import {Platform, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {initialStateProps} from '../../store/slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageType} from '../../types/Image';
import axios from 'axios';
const Container = styled.View`
  flex-direction: row;
  padding: 35px 25px 0 25px;
  flex: 1;
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
  margin-top: 5px;
`;

const TweetImg = styled.ImageBackground`
  flex: 1;
  height: 280px;
`;

const Input = styled.TextInput`
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #494949;
  height: 120px;
  margin-top: 10px;
  color: black;
`;

const BtnColumn = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 12.5px 0;
`;

const UploadBtn = styled.TouchableOpacity<{bkgColor: string}>`
  padding: 10px 20px;
  background-color: ${props => props.bkgColor};
  border-radius: 20px;
`;

const UploadBtnText = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: 13px;
  font-weight: 600;
`;

const Write = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const [image, setImage] = useState<ImageType>();

  const upload = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        const data: any = await launchImageLibrary({
          quality: 1,
          mediaType: 'photo',
        });
        console.log(data);
        setImage(data.assets[0] as ImageType);
      } else {
        const data: any = await launchCamera({
          quality: 1,
          mediaType: 'photo',
        });
        setImage(data.assets[0] as ImageType);
      }
      console.log(image);
      // const data = await launchImageLibrary({
      //   quality: 1,
      //   mediaType: 'photo',
      // });
    } catch (e) {
      console.log(e);
    }
  }, [image]);

  const test = async () => {
    console.log('yap');
    try {
      const formData = new FormData();
      const val = {name: image?.fileName, type: image?.type, uri: image?.uri};
      formData.append('img', val);
      formData.append('content', 'yoyo');

      const {data} = await axios.post(
        'http://localhost:3000/tweet/',
        formData,
        {
          headers: {
            accesstoken:
              'vfowDugqNQQnkRLvcWBVHg5ZZ8BTsjB8UQX5utU1Cj10mQAAAYKC6tI-',
          },
        },
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Left>
        <UserBtn>
          <UserImg
            source={{
              uri: userInfo.img,
            }}
            resizeMode="cover"
            borderRadius={50}
          />
        </UserBtn>
      </Left>
      <Right>
        <Title>
          <MainText>{userInfo.name}</MainText>
          <SubText>@kakao · 4 hours ago</SubText>
        </Title>

        <Input
          placeholderTextColor="#484848"
          multiline
          placeholder="사진 또는 글을 올려주세요."
          numberOfLines={10}
          style={{textAlignVertical: 'top'}}
        />
        <BtnColumn>
          <TouchableOpacity onPress={upload}>
            <Icon name="image" size={33} color="#10DDC2" />
          </TouchableOpacity>
          <UploadBtn bkgColor="#E0E0E0" onPress={test}>
            <UploadBtnText color="#6f6f6f">올리기</UploadBtnText>
          </UploadBtn>
        </BtnColumn>
        {image ? (
          <TweetImgBtn>
            <TweetImg
              source={{
                uri: image.uri,
              }}
              resizeMode="cover"
              borderRadius={30}
              defaultSource={require('../../assets/img/loading.png')}
            />
          </TweetImgBtn>
        ) : null}
      </Right>
    </Container>
  );
};

export default Write;
