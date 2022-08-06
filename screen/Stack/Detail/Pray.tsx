import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
const Pray = ({navigation}: {navigation: any}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      !clicked && setClicked(true);
    });
    return unsubscribe;
  }, [navigation, clicked]);

  return (
    <View style={{flex: 1}}>
      <Text>Detail - Pray / {clicked ? 'data fetch' : 'non fetch'}</Text>
    </View>
  );
};

export default Pray;
