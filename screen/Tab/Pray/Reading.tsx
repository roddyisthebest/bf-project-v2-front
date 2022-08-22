import React, {useState} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PrayType} from '../../../types/Pray';
import PrayEditable from '../../../components/PrayEditable';
import {User} from '../../../types/User';
import moment from 'moment';
const DateSection = styled.View`
  height: 70px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-color: #ced5dc;
  border-bottom-width: 1px;
`;

const DateBtn = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-width: 1px;
  border-color: #10ddc2;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const DateWrapper = styled.View`
  width: 100px;
  height: 30px;
  border-width: 1px;
  border-color: #10ddc2;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
`;
const Date = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #10ddc2;
`;

const Reading = () => {
  const [data, setData] = useState<User[]>([
    {
      name: '배성연',
      id: 1,
      img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
      oauth: 'KAKAO',
      Prays: [
        {id: 1, content: '로또 1등 할 수 있도록', weekend: '2022-06-05'},
        {
          id: 2,
          content:
            '로또 1등 할 수 있도록 로또 1등 할 수 있도록asdasd로또 1등 할 수 있도록로또 1등 할 수 있도록로또 1등 할 수 있도록',
          weekend: '2022-06-05',
        },
        {
          id: 3,
          content:
            '로또 1등 할 수 있도록 로또 1등 할 수 있도록로또das 1등 할 수 있도록 로또 1등 할 수 있도록로또 1등 할 수 있도록',
          weekend: '2022-06-05',
        },
      ],
      payed: false,
    },
    {
      name: '배성연',
      id: 2,
      img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
      oauth: 'KAKAO',
      Prays: [
        {id: 4, content: '로또 1등 할 수 있도록', weekend: '2022-06-05'},
        {
          id: 5,
          content:
            '로또 1등 할 수 있도록 로또 1등 할 수 있도록asdasd로또 1등 할 수 있도록로또 1등 할 수 있도록로또 1등 할 수 있도록',
          weekend: '2022-06-05',
        },
        {
          id: 6,
          content:
            '로또 1등 할 수 있도록 로또 1등 할 수 있도록로또das 1등 할 수 있도록 로또 1등 할 수 있도록로또 1등 할 수 있도록',
          weekend: '2022-06-05',
        },
      ],
      payed: false,
    },
  ]);
  const [weekend, setWeekend] = useState<number>(0);

  const renderItem = ({item}: {item: User}) => (
    <PrayEditable data={item} editable={false} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#ced5dc'}} />
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <DateSection>
            <DateBtn
              onPress={() => {
                setWeekend(prev => prev - 7);
              }}>
              <Icon name="caret-back-outline" size={15} color="#10ddc2" />
            </DateBtn>
            <DateWrapper>
              <Date>{moment().day(weekend).format('YYYY-MM-DD')}</Date>
            </DateWrapper>
            <DateBtn
              onPress={() => {
                setWeekend(prev => prev + 7);
              }}>
              <Icon name="caret-forward-outline" size={15} color="#10ddc2" />
            </DateBtn>
          </DateSection>
        }
      /> */}
    </SafeAreaView>
  );
};

export default Reading;
