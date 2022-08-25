import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PrayEditable from '../../../components/PrayEditable';
import {User} from '../../../types/User';
import moment from 'moment';
import {getPraysByDate, getPraysExistence} from '../../../api/pray';
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
  const [data, setData] = useState<User[]>([]);
  const [weekend, setWeekend] = useState<number>(0);
  const [btnStatus, setBtnStatus] = useState<boolean[]>([false, false]);
  const [existLoading, setExistLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastId, setLastId] = useState<number>(-1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const checkExist = useCallback(async (date: number) => {
    try {
      setExistLoading(true);
      const {
        data: {code: lastCode},
      }: {data: {code: number}} = await getPraysExistence(
        moment()
          .day(date - 7)
          .format('YYYY-MM-DD'),
      );
      const {
        data: {code: nextCode},
      }: {data: {code: number}} = await getPraysExistence(
        moment()
          .day(date + 7)
          .format('YYYY-MM-DD'),
      );
      setBtnStatus([lastCode === 200, nextCode === 200]);
    } catch (e) {
      console.log(e);
    } finally {
      setExistLoading(false);
    }
  }, []);

  const getData = useCallback(
    async (id: number, mutate: boolean) => {
      try {
        const {
          data: {payload},
        }: {data: {payload: User[]}} = await getPraysByDate(
          id,
          moment().day(weekend).format('YYYY-MM-DD'),
        );
        if (mutate) {
          setData(prev => [...prev, ...payload]);
        } else {
          setData([]);
          setData(payload);
        }
      } catch (e) {
        console.log(e);
      } finally {
        if (loading) {
          setLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weekend],
  );

  // const handleRefresh = useCallback(async () => {
  //   try {
  //     setRefreshing(true);
  //     if (lastId === -1) {
  //       try {
  //         const {
  //           data: {payload, code},
  //         }: {data: {payload: User[]; code: number}} = await getPraysByDate(
  //           -1,
  //           moment().day(weekend).format('YYYY-MM-DD'),
  //         );
  //         if (code === 202) {
  //           setDisabled(true);
  //         }
  //         setData([]);
  //         setData(payload);
  //       } catch (e) {
  //         Alert.alert('오류입니다.');
  //       }
  //     } else {
  //       setLastId(-1);
  //     }
  //   } catch (e) {
  //     Alert.alert('오류입니다.');
  //   } finally {
  //     setRefreshing(false);
  //   }
  // }, [weekend]);

  useEffect(() => {
    checkExist(weekend);
    setLastId(-1);
    getData(-1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekend]);

  useEffect(() => {
    if (lastId === -1) {
      getData(lastId, false);
    } else {
      getData(lastId, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);

  const renderItem = ({item}: {item: User}) => (
    <PrayEditable data={item} editable={false} />
  );

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
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <DateSection>
              {btnStatus[0] ? (
                <DateBtn
                  disabled={existLoading}
                  onPress={() => {
                    setWeekend(prev => prev - 7);
                  }}>
                  {existLoading ? (
                    <ActivityIndicator color="#10ddc2" size={15} />
                  ) : (
                    <Icon name="caret-back-outline" size={15} color="#10ddc2" />
                  )}
                </DateBtn>
              ) : null}

              <DateWrapper>
                <Date>{moment().day(weekend).format('YYYY-MM-DD')}</Date>
              </DateWrapper>
              {btnStatus[1] ? (
                <DateBtn
                  disabled={existLoading}
                  onPress={() => {
                    setWeekend(prev => prev + 7);
                  }}>
                  {existLoading ? (
                    <ActivityIndicator color="#10ddc2" size={15} />
                  ) : (
                    <Icon
                      name="caret-forward-outline"
                      size={15}
                      color="#10ddc2"
                    />
                  )}
                </DateBtn>
              ) : null}
            </DateSection>
          }
          onEndReached={() => {
            setLastId(data[data.length - 1].id);
          }}
          refreshing={refreshing}
          onRefresh={() => {
            setLastId(-1);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Reading;
