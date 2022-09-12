import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {deleteTweet} from '../../../api/tweet';
import {getTweetsByUserId} from '../../../api/user';
import Tweet from '../../../components/Tweet';
import {TweetType} from '../../../types/Tweet';
const Tweets = ({
  route: {
    params: {id},
  },
}: {
  route: {params: {id: number}};
}) => {
  const [data, setData] = useState<TweetType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [addLoading, setAddLoading] = useState<boolean>(false);

  const showConfirmDialog = useCallback(
    (idx: number) => {
      return Alert.alert('게시글 삭제', '정말로 이 게시글을 삭제할까요?', [
        // The "Yes" button
        {
          text: '취소',
          onPress: () => {},
          style: 'cancel',
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: '삭제',
          onPress: async () => {
            try {
              await deleteTweet(idx);
              setData(tweet => tweet.filter(e => e.id !== id));
            } catch (e) {}
          },
          style: 'destructive',
        },
      ]);
    },
    [id],
  );

  const delTweet = useCallback(
    (idx: number) => {
      showConfirmDialog(idx);
    },
    [showConfirmDialog],
  );

  const getData = useCallback(
    async (userId: number, last: number) => {
      try {
        if (last !== -1) {
          setAddLoading(true);
        }
        const {
          data: {payload},
        }: {data: {payload: TweetType[]}} = await getTweetsByUserId(
          userId,
          last,
        );
        if (last === -1) {
          setData(payload);
        } else {
          setData(prev => [...prev, ...payload]);
          setAddLoading(false);
        }
        console.log(payload);
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

  useEffect(() => {
    getData(id, lastId);
  }, [lastId, id, getData]);

  const renderItem = ({item}: {item: TweetType}) => (
    <Tweet data={item} del={delTweet} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
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
        ListFooterComponent={
          addLoading ? (
            <View
              style={{
                height: 50,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color="#687684" size={30} />
            </View>
          ) : null
        }
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
              게시글이 없습니다.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Tweets;
