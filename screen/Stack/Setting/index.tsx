import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const Section = styled.View`
  padding: 20px;
  border-bottom-color: #ced5dc;
  border-bottom-width: 0.5px;
`;

const BtnText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 800;
`;
const Setting = ({
  navigation: {navigate},
}: {
  navigation: {navigate: Function};
}) => {
  return (
    <Container>
      <Section>
        <TouchableOpacity
          onPress={() => {
            navigate('Service');
          }}>
          <BtnText>사용 기능 수정</BtnText>
        </TouchableOpacity>
      </Section>
      <Section>
        <TouchableOpacity
          onPress={() => {
            navigate('Profile');
          }}>
          <BtnText>프로필 수정</BtnText>
        </TouchableOpacity>
      </Section>
    </Container>
  );
};

export default Setting;
