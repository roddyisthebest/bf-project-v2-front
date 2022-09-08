import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getInfoById, saveFollow} from '../../../api/user';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteFollowings,
  initialStateProps,
  setFollowings,
} from '../../../store/slice';
import {User} from '../../../types/User';
import moment from 'moment';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const UserBkg = styled.View`
  background-color: #d9d9d9;
`;

const UserContents = styled.View`
  padding: 0 20px 20px 20px;
  border-bottom-width: 1px;
  border-color: #ced5dc;
  margin-bottom: 20px;
`;

const Column = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: flex-end;
  position: relative;
  height: 50px;
`;

const Img = styled.Image`
  border-width: 5px;
  border-color: white;
  background-color: white;
  width: ${Dimensions.get('window').width / 4}px;
  height: ${Dimensions.get('window').width / 4}px;
  border-radius: ${Dimensions.get('window').width / 4.5}px;
  position: absolute;
  top: -${Dimensions.get('window').width / (4 * 2)}px;
  left: 0px;
`;

const SetBtn = styled.TouchableOpacity`
  border: 1px solid #cdcdcd;
  color: black;
  border-radius: 50px;
  align-items: center;
  flex-direction: row;
  padding: 5px 15px;
`;

const FollowBtn = styled.TouchableOpacity<{isItFollow: boolean}>`
  border-width: 1px;
  border-color: ${props => (props.isItFollow ? '#687684' : 'black')};
  background-color: ${props => (props.isItFollow ? 'white' : 'black')};
  border-radius: 50px;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 35px;
`;
const FollowText = styled.Text<{isItFollow: boolean}>`
  font-weight: 600;
  color: ${props => (props.isItFollow ? 'black' : 'white')};
`;

const Info = styled.View`
  margin: 10px 0;
`;

const Name = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: black;
  margin-bottom: 5px;
`;

const SubColumn = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5.5px;
`;
const SubText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #687684;
`;

const MenuTitle = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: black;
  padding: 0 20px;
  margin-bottom: 15px;
`;

const MenuColumn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const MenuText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
  color: black;
`;

const Detail = ({
  route: {
    params: {id},
  },
  navigation: {navigate},
}: {
  navigation: {navigate: Function};
  route: {params: {id: number}};
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<User>();
  const [followerNumber, setFollowerNumber] = useState<number>(0);
  //데이터 수정이 가능한 follower 상태값
  const [following, setFollowing] = useState<boolean>(false);
  //자신이 팔로우 하고 있는지 여부를 판단하는 상태값
  const [loading, setLoading] = useState<boolean>(false);
  const {userInfo} = useSelector((state: initialStateProps) => ({
    userInfo: state.userInfo,
  }));
  const getData = useCallback(
    async (userId: number) => {
      try {
        const {
          data: {payload},
        }: {data: {payload: User}} = await getInfoById(userId);
        setData(payload);
        setFollowing(
          userInfo.Followings.find(e => e.id === userId) ? true : false,
        );

        setFollowerNumber(payload.Followers.length);
      } catch (e) {
      } finally {
      }
    },
    [userInfo],
  );

  useEffect(() => {
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const follow = useCallback(
    async (userId: number, isItFollow: boolean) => {
      try {
        setLoading(true);
        const {
          data: {payload},
        }: {data: {payload: User; code: string}} = await saveFollow(
          !isItFollow,
          userId,
        );
        setFollowing(!isItFollow);
        if (!isItFollow) {
          dispatch(setFollowings(payload));
          setFollowerNumber(prev => prev + 1);
        } else {
          dispatch(deleteFollowings(payload.id));
          setFollowerNumber(prev => prev - 1);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // useEffect(() => {}, [data]);

  return (
    <Container>
      {data ? (
        <>
          <UserBkg style={{height: Dimensions.get('window').height / 7}} />
          <UserContents>
            <Column>
              <Img
                source={{
                  uri: `${data.img}`,
                }}
              />
              {userInfo.id === id ? (
                <SetBtn
                  onPress={() => {
                    navigate('Stack', {screen: 'Setting'});
                  }}>
                  <Icon name="settings" color="black" size={20} />
                  <Text
                    style={{fontWeight: '500', marginLeft: 5, color: 'black'}}>
                    설정
                  </Text>
                </SetBtn>
              ) : (
                <FollowBtn
                  disabled={loading}
                  isItFollow={following}
                  onPress={() => {
                    follow(id, following);
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      color={following ? '#687684' : 'white'}
                      size={10}
                    />
                  ) : (
                    <FollowText isItFollow={following}>
                      {following ? '팔로잉' : '팔로우'}
                    </FollowText>
                  )}
                </FollowBtn>
              )}
            </Column>
            <Info>
              <Name>{data.name}</Name>
              <SubColumn>
                <SubText>@{data.oauth}</SubText>
              </SubColumn>
              <SubColumn>
                <Icon
                  name="calendar-outline"
                  color="#687684"
                  size={15}
                  style={{marginRight: 5}}
                />
                <SubText>
                  Joined {moment(data.createdAt).format('DD MMMM YYYY')}
                </SubText>
              </SubColumn>
              <SubColumn>
                <Text
                  style={{fontWeight: '600', marginRight: 6, color: 'black'}}>
                  {data.Followings.length}
                </Text>
                <SubText style={{marginRight: 6}}>Following</SubText>
                <Text
                  style={{fontWeight: '600', marginRight: 6, color: 'black'}}>
                  {followerNumber}
                </Text>
                <SubText>Follower</SubText>
              </SubColumn>
            </Info>
          </UserContents>
          <MenuTitle>Records</MenuTitle>
          <MenuColumn
            onPress={() => {
              navigate('Stack', {screen: 'Tweets', params: {idx: 1}});
            }}>
            <Icon name="book-outline" color="black" size={25} />
            <MenuText>매일 성경</MenuText>
          </MenuColumn>
          <MenuColumn
            onPress={() => {
              navigate('Stack', {screen: 'Pray', params: {idx: 1}});
            }}>
            <Icon name="heart-outline" color="black" size={25} />
            <MenuText>기도 제목</MenuText>
          </MenuColumn>
          <MenuColumn
            onPress={() => {
              navigate('Stack', {screen: 'Penalty', params: {idx: 1}});
            }}>
            <Icon name="cash-outline" color="black" size={25} />
            <MenuText>벌금</MenuText>
          </MenuColumn>
        </>
      ) : (
        <ActivityIndicator color="#687684" size={50} style={{marginTop: 30}} />
      )}
    </Container>
  );
};

export default Detail;
