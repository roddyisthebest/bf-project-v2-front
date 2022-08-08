import React from 'react';
import styled from 'styled-components/native';
import {PenaltyType} from '../types/Penalty';

const Container = styled.View`
  padding: 25px 30px;
  background-color: white;
`;

const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Key = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: black;
`;

const Value = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: #687684;
`;

const Penalty = ({data}: {data: PenaltyType}) => {
  return (
    <Container>
      <Column style={{marginBottom: 12.5}}>
        <Key>금액</Key>
        <Value>{data.paper}</Value>
      </Column>
      <Column>
        <Key>날짜</Key>
        <Value>{data.weekend}</Value>
      </Column>
    </Container>
  );
};

export default Penalty;
