import React, {useCallback, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import Tweet from '../../../components/Tweet';
import {TweetType} from '../../../types/Tweet';

const Tweets = () => {
  const [data, setData] = useState<TweetType[]>([
    {
      id: 1,
      User: {
        name: '배성연',
        id: 1,
        img: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      content: 'hello',
      img: 'http://api.bf-church.click/img/tweet-img/image1659925698220.jpg',
    },
    {
      id: 2,
      User: {
        name: '김영원',
        id: 2,
        img: 'https://k.kakaocdn.net/dn/iO4QU/btruArCoCYq/8nu5Fi1KlanudmlTO0xg3K/img_640x640.jpg',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      img: 'http://api.bf-church.click/img/tweet-img/image1659925698220.jpg',
      content: '',
    },
    {
      id: 3,
      User: {
        name: '고양석',
        id: 3,
        img: 'https://k.kakaocdn.net/dn/bhJefA/btrhc7jhuuY/VM39uBdT2EjLMJD1WUKmv0/img_640x640.jpg',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      img: 'http://api.bf-church.click/img/tweet-img/image1659925698220.jpg',
      content: 'hello',
    },
    {
      id: 4,
      User: {
        name: '정다운',
        id: 4,
        img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/242662512_441381613958947_6972902439521450150_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=68yMHE5on2kAX8rkOmS&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT_BWsltT39e3y8bUQEG5OELVMp80fLOYccKxq1rE1eQ-g&oe=62F5D365&_nc_sid=8fd12b',
        oauth: 'KAKAO',
        Pray: [],
        payed: false,
      },
      content: '',
      img: 'http://api.bf-church.click/img/tweet-img/image1659925698220.jpg',
    },
  ]);
  const deleteTweet = useCallback((id: number) => {
    setData(tweet => tweet.filter(e => e.id !== id));
  }, []);

  const renderItem = ({item}: {item: TweetType}) => (
    <Tweet data={item} del={deleteTweet} />
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
