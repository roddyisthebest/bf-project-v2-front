import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';
import {PenaltyType} from '../../../types/Penalty';
import PenaltyComponent from '../../../components/Penalty';

import {getPenaltysByUserId} from '../../../api/user';
const Penalty = ({
  route: {
    params: {id},
  },
}: {
  route: {params: {id: number}};
}) => {
  const [data, setData] = useState<PenaltyType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);

  const getData = useCallback(async (userId: number, last: number) => {
    try {
      const {
        data: {payload},
      }: {data: {payload: PenaltyType[]; code: string}} =
        await getPenaltysByUserId(userId, last);

      setData(prev => [...prev, ...payload]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData(id, lastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, lastId]);

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
        onEndReached={() => {
          setLastId(data[data.length - 1].id);
        }}
        ListEmptyComponent={
          <View
            style={{
              marginVertical: 25,
              marginHorizontal: 100,
              backgroundColor: '#10DDC2',
              height: 40,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '900'}}>
              벌금 데이터가 없습니다.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Penalty;
