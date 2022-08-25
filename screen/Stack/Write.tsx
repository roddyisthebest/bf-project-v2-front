import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Alert, Platform, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initialStateProps, setRefresh} from '../../store/slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageType} from '../../types/Image';
import {postTweet} from '../../api/tweet';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
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

const TweetImgBtn = styled.View`
  margin-top: 5px;
  position: relative;
`;

const DelBtn = styled.Pressable`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 100;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
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

const Write = ({
  navigation: {navigate},
}: {
  navigation: {navigate: Function};
}) => {
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const [image, setImage] = useState<ImageType>();
  const [content, setContent] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
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

  useEffect(() => {
    if (image || content.length) {
      setDisabled(false);
    } else {
      if (!disabled) {
        setDisabled(true);
      }
    }
  }, [image, content, disabled]);

  const uploadTweet = useCallback(
    async (text: string, img: ImageType | undefined) => {
      try {
        console.log(img);
        const formData = new FormData();
        const val = {name: img?.fileName, type: img?.type, uri: img?.uri};
        formData.append('img', val);
        formData.append('content', text);
        const accessToken = await EncryptedStorage.getItem('accessToken');
        await fetch('http://192.168.123.103:3000/tweet/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });
        dispatch(setRefresh(true));
        navigate('Tabs', {screen: 'Tweets'});
      } catch (e: any) {
        if (Platform.OS === 'android' && e.column) {
          uploadTweet(text, img);
        } else {
          Alert.alert('에러입니다');
        }
      }
    },
    [dispatch, navigate],
  );

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
        <Input
          placeholderTextColor="#484848"
          multiline
          placeholder="사진 또는 글을 올려주세요."
          numberOfLines={10}
          style={{textAlignVertical: 'top'}}
          onChangeText={(text: string) => {
            setContent(text);
          }}
        />
        <BtnColumn>
          <TouchableOpacity onPress={upload}>
            <Icon name="image" size={33} color="#10DDC2" />
          </TouchableOpacity>
          <UploadBtn
            bkgColor={disabled ? '#E0E0E0' : '#10DDC2'}
            onPress={() => {
              uploadTweet(content, image);
            }}
            disabled={disabled}>
            <UploadBtnText color={disabled ? '#6f6f6f' : 'white'}>
              올리기
            </UploadBtnText>
          </UploadBtn>
        </BtnColumn>
        {image ? (
          <TweetImgBtn>
            <DelBtn
              onPress={() => {
                setImage(undefined);
              }}>
              <Icon name="close-outline" color="black" size={18} />
            </DelBtn>
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
