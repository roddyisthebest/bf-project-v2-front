import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Tweet from '../../../components/Tweet';
const Tweets = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    console.log('tweet!');
    setClicked(true);
  }, []);

  const renderItem = () => <Tweet />;

  const data = [
    {idx: 1, name: '배성연', content: 'hello', img: ''},
    {idx: 2, name: '김영원', img: ''},
    {idx: 3, name: '고양석', img: ''},
    {idx: 4, name: '정다운', content: ''},
  ];
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
