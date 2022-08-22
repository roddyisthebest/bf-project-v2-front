import React, {useCallback, useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
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

const Creating = () => {
  const [data, setData] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [lastId, setLastId] = useState<number>(-1);

  const getData = useCallback(
    async (id: number) => {
      try {
        const {
          data: {payload},
        }: {data: {payload: User[]}} = await getPrays(id);
        console.log(payload);
        if (id === -1) {
          setData([]);
          setData([...payload]);
        } else {
          setData(prev => [...prev, ...payload]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        if (loading) {
          setLoading(false);
        }
      }
    },
    [loading],
  );

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setLastId(-1);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, []);
  useEffect(() => {
    getData(lastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);

  const renderItem = ({item}: {item: User}) => (
    <PrayEditable data={item} editable={true} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
        onEndReached={() => {
          setLastId(data[data.length - 1].id);
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default Creating;
