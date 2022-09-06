import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {setToken} from '../../api';
import {login, setAuth, setUserInfo} from '../../store/slice';
import Config from 'react-native-config';
import {getMyInfo} from '../../api/user';
import {User} from '../../types/User';

const SnsLogin = () => {
  const dispatch = useDispatch();

  const IJECTED_JAVASCRIPT = `
  
  const element = document.getElementsByTagName("pre");
  
  if(element){
    window.ReactNativeWebView.postMessage(element[0].innerHTML);
    const body = document.getElementsByTagName("body");
    body[0].innerHTML= '잠시만 기다려주세요.'
  }
  `;

  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const onWebViewMessage = (e: any) => {
    const jsonData = JSON.parse(e.nativeEvent.data);
    if (
      jsonData.payload.token.access_token &&
      jsonData.payload.token.refresh_token
    ) {
      setAccessToken(jsonData.payload.token.access_token);
      setRefreshToken(jsonData.payload.token.refresh_token);
    }
  };

  const setTokenInfo = async (access: string, refresh: string) => {
    await EncryptedStorage.setItem('refreshToken', refresh);
    await EncryptedStorage.setItem('accessToken', access);
    console.log('refresh', refresh);
    console.log('access', access);

    await setToken();
    dispatch(login(true));
    const {
      data: {payload},
    }: {data: {payload: User}} = await getMyInfo();
    dispatch(setUserInfo(payload));
    dispatch(setAuth(true));
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      setTokenInfo(accessToken, refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);
  return (
    <View style={{flex: 1}}>
      <WebView
        userAgent="Chrome"
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.KAKAO_CALLBACK}&response_type=code`,
        }}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        injectedJavaScript={IJECTED_JAVASCRIPT}
        onMessage={onWebViewMessage}
        originWhitelist={['*']}
      />
    </View>
  );
};

export default SnsLogin;
