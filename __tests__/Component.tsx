import 'react-native';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Penalty from '../components/Penalty';
import {PenaltyType} from '../types/Penalty';
import PenaltyEditable from '../components/PenaltyEditable';
import {User} from '../types/User';
import {PrayType} from '../types/Pray';
import Pray from '../components/Pray';
import PrayEditable from '../components/PrayEditable';
import {TweetType} from '../types/Tweet';
import Tweet from '../components/Tweet';
import {useSelector} from 'react-redux';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-redux');
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Penalty', () => {
  it('스냅 샷', () => {
    const data: PenaltyType = {
      id: 1,
      paper: 1000,
      weekend: '2022-01-01',
      User: {
        id: 1,
        oauth: 'KAKAO',
        name: 'hyojin',
        img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
        payed: true,
        Prays: null,
        Penalties: [],
        Followers: [],
        Followings: [],
        Service: {},
        createdAt: '2022-09-05 11:30:02',
        updatedAt: '2022-09-05 11:30:02',
      },
    };
    render(<Penalty data={data} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('PenaltyEditable', () => {
  it('스냅 샷', () => {
    const data: User = {
      id: 1,
      oauth: 'KAKAO',
      name: 'hyojin',
      img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
      payed: true,
      Prays: null,
      Penalties: [{paper: 1000, id: 1, weekend: '2022-06-01', User: {}}],
      Followers: [],
      Followings: [],
      Service: {
        tweet: false,
        penalty: false,
        pray: false,
        UserId: 231,
        id: 1,
      },
      createdAt: '2022-09-05 11:30:02',
      updatedAt: '2022-09-05 11:30:02',
    };
    render(<PenaltyEditable data={data} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Pray', () => {
  it('스냅샷', () => {
    const data: PrayType = {
      id: 1,
      content: 'hello hyojin',
      weekend: '2022-09-05 11:30:02',
    };
    render(<Pray data={data} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('PrayEditable', () => {
  it('스냅샷', () => {
    const data: User = {
      id: 1,
      oauth: 'KAKAO',
      name: 'hyojin',
      img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
      payed: true,
      Prays: null,
      Penalties: [],
      Followers: [],
      Followings: [],
      Service: {tweet: false, penalty: false, pray: false, UserId: 231, id: 1},
      createdAt: '2022-09-05 11:30:02',
      updatedAt: '2022-09-05 11:30:02',
    };
    render(<PrayEditable data={data} editable={true} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Tweet', () => {
  it('스냅샷', () => {
    const useSelectorCopy = useSelector as jest.Mock<any>;
    useSelectorCopy.mockImplementation(selector =>
      selector({
        userInfo: {
          img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
          id: 23,
        },
      }),
    );
    const data: TweetType = {
      id: 1,
      img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
      content: 'hyojin saranghae',
      User: {
        id: 1,
        oauth: 'KAKAO',
        name: 'hyojin',
        img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
        payed: true,
        Prays: null,
        Penalties: [],
        Followers: [],
        Followings: [],
        Service: {
          tweet: false,
          penalty: false,
          pray: false,
          UserId: 231,
          id: 1,
        },
        createdAt: '2022-09-05 11:30:02',
        updatedAt: '2022-09-05 11:30:02',
      },
      createdAt: '2022-09-05 11:30:02',
      updatedAt: '2022-09-05 11:30:02',
    };
    render(<Tweet data={data} del={() => {}} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('버튼 클릭시 함수 실행', () => {
    const useSelectorCopy = useSelector as jest.Mock<any>;
    useSelectorCopy.mockImplementation(selector =>
      selector({
        userInfo: {
          img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
          id: 23,
        },
      }),
    );
    const data: TweetType = {
      id: 1,
      img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
      content: 'hyojin saranghae',
      User: {
        id: 23,
        oauth: 'KAKAO',
        name: 'hyojin',
        img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
        payed: true,
        Prays: null,
        Penalties: [],
        Followers: [],
        Followings: [],
        Service: {
          tweet: false,
          penalty: false,
          pray: false,
          UserId: 231,
          id: 1,
        },
        createdAt: '2022-09-05 11:30:02',
        updatedAt: '2022-09-05 11:30:02',
      },
      createdAt: '2022-09-05 11:30:02',
      updatedAt: '2022-09-05 11:30:02',
    };
    const handleClick = jest.fn();
    render(<Tweet data={data} del={handleClick} />);
    let button = screen.getByTestId('button');
    expect(button).toHaveTextContent('삭제하기');
    fireEvent(button, 'click');
    expect(handleClick).toBeCalled();
  });
});
