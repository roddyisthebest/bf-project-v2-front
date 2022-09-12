import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {PrayType} from '../../../types/Pray';
import PrayComponent from '../../../components/Pray';
import {getPraysByUserId} from '../../../api/user';

const Pray = ({
  route: {
    params: {id},
  },
}: {
  route: {params: {id: number}};
}) => {
  const [data, setData] = useState<PrayType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const getData = useCallback(async (userId: number, last: number) => {
    try {
      const {
        data: {payload, code},
      }: {data: {payload: PrayType[]; code: string}} = await getPraysByUserId(
        userId,
        last,
      );
      if (code === 'last data') {
        setDisabled(true);
      }

      setData(prev => [...prev, ...payload]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!disabled) {
      getData(id, lastId);
      console.log(lastId);
    }
  }, [getData, id, lastId, disabled]);
  const renderItem = ({item}: {item: PrayType}) => (
    <PrayComponent data={item} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator color="#687684" size={50} style={{marginTop: 30}} />
      ) : (
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
                기도제목 데이터가 없습니다.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Pray;
