import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {getPenaltys} from '../../api/penalty';
import PenaltyEditable from '../../components/PenaltyEditable';
import {User} from '../../types/User';

const Penalty = () => {
  const [data, setData] = useState<User[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleRefresh = useCallback(async (id: number) => {
    try {
      setDisabled(false);
      setRefreshing(true);
      if (id === -1) {
        const {
          data: {payload, code},
        }: {data: {payload: User[]; code: string}} = await getPenaltys(id);
        setData(payload);
        if (code === 'last data') {
          setDisabled(true);
        }
      } else {
        setLastId(-1);
      }
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getData = useCallback(async (id: number) => {
    try {
      const {
        data: {payload, code},
      }: {data: {payload: User[]; code: string}} = await getPenaltys(id);

      if (code === 'last data') {
        setDisabled(true);
      }

      if (id === -1) {
        setData(payload);
      } else {
        setData(prev => [...prev, ...payload]);
      }
    } catch (e) {
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!disabled) {
      getData(lastId);
    }
  }, [disabled, getData, lastId]);

  const renderItem = ({item}: {item: User}) => <PenaltyEditable data={item} />;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <ActivityIndicator color="#687684" size={50} style={{marginTop: 30}} />
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#ced5dc'}} />
          )}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReached={() => {
            setLastId(data[data.length - 1].id);
          }}
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh(lastId);
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
      )}
    </SafeAreaView>
  );
};
export default Penalty;
