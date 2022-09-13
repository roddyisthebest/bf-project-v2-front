import 'react-native';
import React from 'react';
import Code from '../screen/Auth/Code';
import {render, screen, fireEvent} from '@testing-library/react-native';
import axios from 'axios';
import Setting from '../screen/Auth/Setting';
import Login from '../screen/Login/Login';
import SnsLogin from '../screen/Login/SnsLogin';
import Write from '../screen/Stack/Write';
import {useSelector} from 'react-redux';
import FormData from 'form-data';

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

const accessToken: string =
  'Vj_qtcM3gEFBkj9eZA6jxwpeQejOIY4p5WAq_WvXCisNIAAAAYM1YIav';
const API_URL = 'https://api.bf-church.click';
describe('Code', () => {
  const code: string = '060419';
  const useSelectorCopy = useSelector as jest.Mock<any>;
  useSelectorCopy.mockImplementation(selector =>
    selector({
      authLoading: false,
    }),
  );

  it('코드 값 변경 ', async () => {
    render(<Code />);
    fireEvent.changeText(screen.getByTestId('input'), code);
    const codeOutput = await screen.findByTestId('inputValue');
    expect(codeOutput).toHaveTextContent(code);
  });
  it('api 통신', async () => {
    try {
      const {status} = await axios.post(
        `${API_URL}/user/auth/code`,
        {code},
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        },
      );
      expect(status).toBe(200);
    } catch (e) {
      expect(e).toBeNaN();
    }
  });
  it('스냅샷', () => {
    render(<Code />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Setting', () => {
  it('스위치 값 변경', async () => {
    render(<Setting />);
    let switchButton = screen.getByTestId('button');
    fireEvent(switchButton, 'onValueChange', true);
    const switchOutput = await screen.findByTestId('inputValue');
    expect(switchOutput).toHaveTextContent('true');
  });

  it('api 통신', async () => {
    try {
      const {status} = await axios.put(
        `${API_URL}/user/service`,
        {
          tweet: true,
          pray: true,
          penalty: true,
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        },
      );
      expect(status).toBe(200);
    } catch (e) {
      expect(e).toBeNaN();
    }
  });
  it('스냅샷', () => {
    render(<Setting />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Login', () => {
  it('스냅샷', () => {
    render(<Login />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('SnsLogin', () => {
  it('스냅샷', () => {
    render(<SnsLogin />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Tweets', () => {
  it('api 통신', async () => {
    try {
      const {status} = await axios.get(`${API_URL}/tweet/-1`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      expect(status).toBe(200);
    } catch (e) {
      expect(e).toBeNaN();
    }
  });
});

describe('Penalty', () => {
  it('api 통신', async () => {
    try {
      const {status} = await axios.get(`${API_URL}/penalty/-1`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      expect(status).toBe(200);
    } catch (e) {
      expect(e).toBeNaN();
    }
  });
});

describe('Write', () => {
  it('input 값 변경', async () => {
    const useSelectorCopy = useSelector as jest.Mock<any>;
    useSelectorCopy.mockImplementation(selector =>
      selector({
        userInfo: {
          img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/296105988_735019344242739_8809340187758356692_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=8FKKENxkJq0AX_C-dmH&tn=BEmipNgrm38iVWSi&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mjg3OTkzOTcxNjI2OTk2Nw%3D%3D.2-ccb7-5&oh=00_AT--zRwVOwpBF0Q2WOcAZMTTTZdHO2xVJvDleUXOK-uKGw&oe=63214EBE&_nc_sid=30a2ef',
        },
      }),
    );
    const value: string = 'hello hyojin!';
    render(<Write />);
    fireEvent.changeText(screen.getByTestId('input'), value);
    const codeOutput = await screen.findByTestId('inputValue');
    expect(codeOutput).toHaveTextContent(value);
  });
  it('api 통신', async () => {
    try {
      const formData = new FormData();
      formData.append('content', 'hello');
      const {status} = await axios.post(`${API_URL}/tweet/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      expect(status).toBe(200);
    } catch (e: any) {
      expect(e.response.status).toBe(406);
    }
  });
  it('스냅샷', () => {
    render(<Write />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
