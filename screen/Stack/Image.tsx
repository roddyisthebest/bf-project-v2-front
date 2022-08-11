import React from 'react';
import {Dimensions, Text, View, Pressable, Platform} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../navigation/Root';
import ImageViewer from 'react-native-image-zoom-viewer';

import Icon from 'react-native-vector-icons/Ionicons';
const ImagePage = ({
  route: {
    params: {uri},
  },
}: {
  route: {params: {uri: string}};
}) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  console.log(uri);
  const images = [
    {
      // Simplest usage.
      url: uri,
      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Platform.OS === 'android' ? 60 : 80,
          backgroundColor: 'black',
          position: 'absolute',
          zIndex: 5,
          justifyContent: 'center',
          paddingHorizontal: Platform.OS === 'android' ? 15 : 20,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back-outline" color="white" size={25} />
        </Pressable>
      </View>
      <ImageViewer
        imageUrls={images}
        renderIndicator={() => <Text />}
        loadingRender={() => (
          <View>
            <Text style={{color: 'white'}}>로딩</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ImagePage;
