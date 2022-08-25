import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {getTweets} from '../../api/tweet';
import Tweet from '../../components/Tweet';
import {initialStateProps, setRefresh} from '../../store/slice';
import {TweetType} from '../../types/Tweet';
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const LoadingContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: center;
`;

const Tweets = () => {
  const dispatch = useDispatch();
  const target = useRef<any>();

  const {refresh} = useSelector((state: initialStateProps) => ({
    refresh: state.refresh,
  }));

  const [data, setData] = useState<TweetType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const deleteTweet = useCallback((id: number) => {
    setData(tweet => tweet.filter(e => e.id !== id));
  }, []);

  const [lastId, setLastId] = useState<number>(-1);

  const renderItem = ({item}: {item: TweetType}) => (
    <Tweet data={item} del={deleteTweet} />
  );

  const getData = useCallback(
    async (id: number) => {
      try {
        const {
          data: {payload},
        }: {data: {payload: TweetType[]}} = await getTweets(id);
        if (id === -1) {
          setData(payload);
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
      if (lastId === -1) {
        const {
          data: {payload},
        }: {data: {payload: TweetType[]}} = await getTweets(lastId);
        setData(payload);
      } else {
        setLastId(-1);
      }
    } catch (e) {
      Alert.alert('오류입니다.');
    } finally {
      setRefreshing(false);
    }
  }, [lastId]);

  useEffect(() => {
    getData(lastId);
  }, [getData, lastId]);

  useEffect(() => {
    if (refresh) {
      handleRefresh();
      target.current.scrollToOffset({animated: true, offset: 0});
      Alert.alert('성공적으로 업로드되었습니다🔥');
      dispatch(setRefresh(false));
    }
  }, [refresh, handleRefresh, dispatch]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#687684" size={50} />
        </LoadingContainer>
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#ced5dc'}} />
          )}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            setLastId(data[data.length - 1].id);
            console.log('밑에 닿았어!');
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ref={target}
        />
      )}
    </Container>
  );
};
export default Tweets;
