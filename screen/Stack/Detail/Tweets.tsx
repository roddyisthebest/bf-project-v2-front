import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {deleteTweet} from '../../../api/tweet';
import {getTweetsByUserId} from '../../../api/user';
import Tweet from '../../../components/Tweet';
import {initialStateProps} from '../../../store/slice';
import {TweetType} from '../../../types/Tweet';
const Tweets = () => {
  const [data, setData] = useState<TweetType[]>([]);
  const [lastId, setLastId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));

  const showConfirmDialog = useCallback((id: number) => {
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
            await deleteTweet(id);
            setData(tweet => tweet.filter(e => e.id !== id));
          } catch (e) {
            Alert.alert('에러입니다.');
          }
        },
        style: 'destructive',
      },
    ]);
  }, []);

  const delTweet = useCallback(
    (id: number) => {
      showConfirmDialog(id);
    },
    [showConfirmDialog],
  );

  const getData = useCallback(
    async (id: number, last: number) => {
      try {
        if (id !== -1) {
          setAddLoading(true);
        }
        const {
          data: {payload},
        }: {data: {payload: TweetType[]}} = await getTweetsByUserId(id, last);
        if (id === -1) {
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
    getData(userInfo.id, lastId);
    console.log('data!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId]);

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
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   reviewConainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#F3F3F3',
//     borderRadius: 10,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 32,
//   },
// });

export default Tweets;
