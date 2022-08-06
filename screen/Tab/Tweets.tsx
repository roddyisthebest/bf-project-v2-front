import React from 'react';
import {View, ScrollView} from 'react-native';
import Tweet from '../../components/Tweet';
const Tweets = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </ScrollView>
    </View>
  );
};
export default Tweets;
