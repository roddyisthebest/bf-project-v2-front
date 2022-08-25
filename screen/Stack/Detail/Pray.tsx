import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {PrayType} from '../../../types/Pray';
import PrayComponent from '../../../components/Pray';
import {getPraysByUserId} from '../../../api/user';
import {initialStateProps} from '../../../store/slice';
import {useSelector} from 'react-redux';
const Pray = () => {
  const [data, setData] = useState<PrayType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const getData = useCallback(async (id: number, last: number) => {
    try {
      const {
        data: {payload},
      }: {data: {payload: PrayType[]; code: number}} = await getPraysByUserId(
        id,
        last,
      );

      setData(prev => [...prev, ...payload]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData(userInfo.id, lastId);
    console.log(lastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);
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
        onEndReached={() => {
          setLastId(data[data.length - 1].id);
        }}
      />
    </SafeAreaView>
  );
};

export default Pray;
