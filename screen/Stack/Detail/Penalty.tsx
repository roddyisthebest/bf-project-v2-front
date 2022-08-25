import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {PenaltyType} from '../../../types/Penalty';
import PenaltyComponent from '../../../components/Penalty';
import {initialStateProps} from '../../../store/slice';
import {useSelector} from 'react-redux';
import {getPenaltysByUserId} from '../../../api/user';
const Penalty = () => {
  const [data, setData] = useState<PenaltyType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const getData = useCallback(async (id: number, last: number) => {
    try {
      const {
        data: {payload},
      }: {data: {payload: PenaltyType[]; code: number}} =
        await getPenaltysByUserId(id, last);

      setData(prev => [...prev, ...payload]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData(userInfo.id, lastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);

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
      />
    </SafeAreaView>
  );
};

export default Penalty;
