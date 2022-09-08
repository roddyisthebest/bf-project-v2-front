import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Alert, Platform, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initialStateProps, logout, setRefresh} from '../../store/slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageType} from '../../types/Image';
import EncryptedStorage from 'react-native-encrypted-storage';
import useSocket from '../../hooks/useSocket';
import Config from 'react-native-config';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../navigation/Root';
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

const Write = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const dispatch = useDispatch();

  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const [image, setImage] = useState<ImageType>();
  const [content, setContent] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, disconnect] = useSocket();
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
        console.log(data);
      }

      // const data = await launchImageLibrary({
      //   quality: 1,
      //   mediaType: 'photo',
      // });
    } catch (e) {
      console.log(e);
    }
  }, []);

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
    async (img: ImageType | undefined, text: string) => {
      try {
        const formData = new FormData();
        const val = {name: img?.fileName, type: img?.type, uri: img?.uri};
        img && formData.append('img', val);
        text && formData.append('content', text);
        const accessToken = await EncryptedStorage.getItem('accessToken');

        const {status}: any = await fetch(`${Config.API_URL}/tweet/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });
        console.log(status);
        if ((status as number) === 403) {
          Alert.alert('게시글을 업로드하는 서비스를 이용하지 않으셨습니다.⚠️');
          return;
        } else if ((status as number) === 406) {
          Alert.alert('오늘 업로드 된 게시물이 존재합니다. ⚠️');
          return;
        }
        socket?.emit('feed-uploaded', {id: userInfo.id});
        dispatch(setRefresh(true));
        navigation.navigate('Tabs', {screen: 'Tweets', params: null});
      } catch (e: any) {
        if (e.column && Platform.OS === 'android') {
          uploadTweet(img, text);
        } else if (e.response.status === 500) {
          Alert.alert('서버 에러입니다. 관리자에게 문의하세요. 01051529445');
          dispatch(logout());
        } else {
          Alert.alert('에러입니다');
        }
      }
    },
    [dispatch, navigation, socket, userInfo.id],
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
          testID="input"
        />
        <BtnColumn>
          <TouchableOpacity onPress={upload}>
            <Icon name="image" size={33} color="#10DDC2" />
          </TouchableOpacity>
          <UploadBtn
            bkgColor={disabled ? '#E0E0E0' : '#10DDC2'}
            onPress={() => {
              uploadTweet(image, content);
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
      <Text style={{display: 'none'}} testID="inputValue">
        {content}
      </Text>
    </Container>
  );
};

export default Write;
