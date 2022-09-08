import 'react-native';
import React from 'react';
import Code from '../screen/Auth/Code';
import {render, screen, fireEvent} from '@testing-library/react-native';
import axios from 'axios';
import Setting from '../screen/Auth/Setting';
import Login from '../screen/Login/Login';
import SnsLogin from '../screen/Login/SnsLogin';

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
const accessToken: string =
  'ZtMM-4xqBgO0DoUjoFYtHx9nXe_F84kgStggI61aCj1ylwAAAYMbJr1_';
const API_URL = 'https://api.bf-church.click';
describe('Code', () => {
  const code: string = '060419';
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
    // const useSelectorCopy = useSelector as jest.Mock<any>;
    // useSelectorCopy.mockImplementation(selector =>
    //   selector({
    //     refresh: false,
    //   }),
    // );

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
