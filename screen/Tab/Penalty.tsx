import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import PenaltyEditable from '../../components/PenaltyEditable';
import {PenaltyType} from '../../types/Penalty';

const Penalty = () => {
  const [data, setData] = useState<PenaltyType[]>([
    {
      id: 1,
      weekend: '2022-06-20',
      paper: 1000,
      User: {
        name: '조유리',
        img: 'https://image.xportsnews.com/contents/images/upload/article/2020/1005/mb_1601823938888337.jpg',
        id: 1,
        oauth: 'KAKAO',
        Pray: [],
        payed: true,
      },
    },
    {
      id: 2,
      weekend: '2022-06-20',
      paper: 0,
      User: {
        name: '배성연',
        img: 'https://image.xportsnews.com/contents/images/upload/article/2020/1005/mb_1601823938888337.jpg',
        id: 2,
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
    },
    {
      id: 3,
      weekend: '2022-06-20',
      paper: 0,
      User: {
        name: '삼다수',
        img: 'https://image.xportsnews.com/contents/images/upload/article/2020/1005/mb_1601823938888337.jpg',
        id: 3,
        oauth: 'KAKAO',
        Pray: [],
        payed: true,
      },
    },
    {
      id: 4,
      weekend: '2022-06-20',
      paper: 0,
      User: {
        name: '신일 선풍기',
        img: 'https://image.xportsnews.com/contents/images/upload/article/2020/1005/mb_1601823938888337.jpg',
        id: 4,
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
    },
  ]);
  const renderItem = ({item}: {item: PenaltyType}) => (
    <PenaltyEditable data={item} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#ced5dc'}} />
        )}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
export default Penalty;
