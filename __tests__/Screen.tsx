import 'react-native';
import React from 'react';
import Code from '../screen/Auth/Code';
import {render, screen, fireEvent} from '@testing-library/react-native';
import axios from 'axios';
import Setting from '../screen/Auth/Setting';
import Login from '../screen/Login/Login';
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
        'https://api.bf-church.click/user/auth/code',
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
        'https://api.bf-church.click/user/service',
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
