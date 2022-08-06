import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Tweet from '../../../components/Tweet';
const Tweets = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    console.log('data fetch');
    setClicked(true);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
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
