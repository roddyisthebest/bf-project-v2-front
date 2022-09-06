import React, {useCallback, useEffect, useState} from 'react';
import {View, SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import PrayEditable from '../../../components/PrayEditable';
import {User} from '../../../types/User';
import moment from 'moment';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {getPrays} from '../../../api/pray';

const DateSection = styled.View`
  height: 70px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-color: #ced5dc;
  border-bottom-width: 1px;
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

const Creating = ({
  navigation: {addListener},
}: {
  navigation: {addListener: Function};
}) => {
  const [data, setData] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastId, setLastId] = useState<number>(-1);

  const getData = useCallback(async (id: number) => {
    try {
      const {
        data: {payload, code, msg},
      }: {data: {payload: User[]; code: string; msg: string}} = await getPrays(
        id,
      );
      console.log('데이터입니다', payload, msg, code);
      if (code === 'last data') {
        setDisabled(true);
      }
      if (id === -1) {
        setData([]);
        setData([...payload]);
      } else {
        setData(prev => [...prev, ...payload]);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setDisabled(false);
      if (lastId === -1) {
        try {
          const {
            data: {payload, code},
          }: {data: {payload: User[]; code: string}} = await getPrays(-1);
          if (code === 'last data') {
            setDisabled(true);
          }
          setData([]);
          setData(payload);
        } catch (e) {}
      } else {
        setLastId(-1);
      }
    } catch (e) {
      Alert.alert('오류입니다.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [lastId]);

  useEffect(() => {
    const unsubcribe = addListener('tabPress', async () => {
      if (loading) {
        await getData(-1);
        setLoading(false);
      }
    });
    return unsubcribe;
  }, [addListener, getData, loading]);

  useEffect(() => {
    if (!loading && !disabled) {
      getData(lastId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);

  const renderItem = ({item}: {item: User}) => (
    <PrayEditable data={item} editable={true} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <ActivityIndicator color="#687684" size={50} style={{marginTop: 30}} />
      ) : (
        <KeyboardAwareFlatList
          extraScrollHeight={100}
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#ced5dc'}} />
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <DateSection>
              <DateWrapper>
                <Date>{moment().day(0).format('YYYY-MM-DD')}</Date>
              </DateWrapper>
            </DateSection>
          }
          onEndReached={async () => {
            setLastId(data[data.length - 1].id);
            console.log('밑에 닿았어!');
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default Creating;
