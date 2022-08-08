import React, {useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {PrayType} from '../../../types/Pray';
import PrayComponent from '../../../components/Pray';
const Pray = () => {
  const [data, setData] = useState<PrayType[]>([
    {
      id: 1,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
      },
      content: '로또 1등 할 수 있도록',
      weekend: '2022-06-05',
    },
    {
      id: 2,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
      },
      content:
        '로또 1등 할 수 있도록 로또 1등 할 수 있도록asdasd로또 1등 할 수 있도록로또 1등 할 수 있도록로또 1등 할 수 있도록',
      weekend: '2022-06-05',
    },
    {
      id: 3,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
      },
      content:
        '로또 1등 할 수 있도록 로또 1등 할 수 있도록로또das 1등 할 수 있도록 로또 1등 할 수 있도록로또 1등 할 수 있도록',
      weekend: '2022-06-05',
    },
  ]);

  const renderItem = ({item}: {item: PrayType}) => (
    <PrayComponent data={item} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#ced5dc'}} />
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Pray;
