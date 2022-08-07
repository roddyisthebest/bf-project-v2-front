import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Tweet from '../../../components/Tweet';
const Tweets = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    console.log('tweet!');
    setClicked(true);
  }, []);

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </ScrollView>
    </>
  );
};

export default Tweets;
