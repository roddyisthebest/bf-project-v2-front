import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {getTweets} from '../../api/tweet';
import Tweet from '../../components/Tweet';
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
      setLastId(-1);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getData(lastId);
  }, [getData, lastId]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="black" size={50} />
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
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </Container>
  );
};
export default Tweets;
