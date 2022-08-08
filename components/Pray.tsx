import React from 'react';
import styled from 'styled-components/native';
import {PrayType} from '../types/Pray';

const Container = styled.View`
  padding: 25px 30px;
  background-color: white;
  flex-direction: row;
`;

const Content = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #687684;
  flex: 1;
  margin-right: 20px;
`;

const Date = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: #687684;
`;

const Pray = ({data}: {data: PrayType}) => {
  return (
    <Container>
      <Content>{data.content}</Content>
      <Date>{data.weekend}</Date>
    </Container>
  );
};

export default Pray;
