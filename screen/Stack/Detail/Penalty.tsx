import React, {useState} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {PenaltyType} from '../../../types/Penalty';
import PenaltyComponent from '../../../components/Penalty';
const Penalty = () => {
  const [data, setData] = useState<PenaltyType[]>([
    {
      id: 1,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      paper: 0,
      weekend: '2022-06-05',
    },
    {
      id: 2,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      paper: 1000,
      weekend: '2022-05-21',
    },
  ]);

  const renderItem = ({item}: {item: PenaltyType}) => (
    <PenaltyComponent data={item} />
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

export default Penalty;
