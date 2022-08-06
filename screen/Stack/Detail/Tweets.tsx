import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
const Tweets = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    console.log('data fetch');
    setClicked(true);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>Detail - {clicked ? 'fetch' : 'not fetch'}</Text>
    </View>
  );
};

export default Tweets;
