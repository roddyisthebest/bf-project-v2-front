import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {login} from '../../store/slice';

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

    // await setToken();
    dispatch(login(true));
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
          uri: 'https://kauth.kakao.com/oauth/authorize?client_id=8e90fd53b25935044191bd3ebd2bf726&redirect_uri=http://192.168.123.105:3000/user/auth/kakao/callback&response_type=code',
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
