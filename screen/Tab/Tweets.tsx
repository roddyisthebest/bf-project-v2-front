import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {deleteTweet, getTweets} from '../../api/tweet';
import Tweet from '../../components/Tweet';
import {initialStateProps, setFeed, setRefresh} from '../../store/slice';
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

const FlatContainer = styled.View`
  position: relative;
  flex: 1;
`;

const SocketMsgContainer = styled.View`
  position: absolute;
  top: 0px;
  height: 48px;
  z-index: 100;
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
  align-items: center;
`;

const SocketMsg = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  background-color: #ececec;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SocketMsgText = styled.Text`
  color: black;
  font-size: 12px;
  font-weight: 600;
`;

const Tweets = () => {
  const dispatch = useDispatch();
  const target = useRef<any>();

  const {refresh} = useSelector((state: initialStateProps) => ({
    refresh: state.refresh,
  }));

  const {newFeed} = useSelector((state: initialStateProps) => ({
    newFeed: state.newFeed,
  }));

  const [data, setData] = useState<TweetType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastId, setLastId] = useState<number>(-1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleRefresh = useCallback(async () => {
    try {
      setDisabled(false);
      setRefreshing(true);
      if (lastId === -1) {
        const {
          data: {payload},
        }: {data: {payload: TweetType[]}} = await getTweets(lastId);
        setData(payload);
        setRefreshing(false);
      } else {
        setLastId(-1);
      }
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, [lastId]);
  const showConfirmDialog = useCallback(
    (id: number) => {
      return Alert.alert('????????? ??????', '????????? ??? ???????????? ????????????????', [
        // The "Yes" button
        {
          text: '??????',
          onPress: () => {},
          style: 'cancel',
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: '??????',
          onPress: async () => {
            try {
              await deleteTweet(id);
              setData(tweet => tweet.filter(e => e.id !== id));
              handleRefresh();
            } catch (e) {}
          },
          style: 'destructive',
        },
      ]);
    },
    [handleRefresh],
  );
  const delTweet = useCallback(
    async (id: number) => {
      showConfirmDialog(id);
    },
    [showConfirmDialog],
  );

  const renderItem = ({item}: {item: TweetType}) => (
    <Tweet data={item} del={delTweet} />
  );

  const getData = useCallback(
    async (id: number) => {
      try {
        const {
          data: {payload, code},
        }: {data: {payload: TweetType[]; code: string}} = await getTweets(id);
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
    },
    [loading],
  );

  useEffect(() => {
    if (!disabled) {
      getData(lastId);
    }
  }, [getData, lastId, disabled]);

  useEffect((): (() => void) => {
    const unsubscribe = () => {
      if (refresh) {
        handleRefresh();
        if (target.current) {
          target.current.scrollToOffset({animated: true, offset: 0});
        }
        setDisabled(false);
        Alert.alert('??????????????? ????????????????????????????');
        dispatch(setRefresh(false));
      }
    };
    unsubscribe();
    return () => unsubscribe;
  }, [refresh, handleRefresh, dispatch]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#687684" size={50} />
        </LoadingContainer>
      ) : (
        <FlatContainer>
          {newFeed !== 0 ? (
            <SocketMsgContainer>
              <SocketMsg
                onPress={() => {
                  handleRefresh();
                  dispatch(setFeed(false));
                }}>
                <SocketMsgText>??? ?????????</SocketMsgText>
                <SocketMsgText style={{marginLeft: 8}}>
                  +{newFeed}
                </SocketMsgText>
              </SocketMsg>
            </SocketMsgContainer>
          ) : null}

          <FlatList
            data={data}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#ced5dc'}} />
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              setLastId(data[data.length - 1].id);
              console.log(data[data.length - 1].id);
            }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ref={target}
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
                  ???????????? ????????????.
                </Text>
              </View>
            }
          />
        </FlatContainer>
      )}
    </Container>
  );
};
export default Tweets;
