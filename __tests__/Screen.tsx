import 'react-native';
import React from 'react';
import Code from '../screen/Auth/Code';
import {render, screen, fireEvent} from '@testing-library/react-native';
import axios from 'axios';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
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

describe('code', () => {
  render(<Code />);
  const code: string = '060419';
  it('코드 값 수정 ', async () => {
    fireEvent.changeText(screen.getByTestId('input'), code);
    const codeOutput = await screen.findByTestId('inputValue');
    expect(codeOutput).toHaveTextContent(code);
  });

  it('api 통신', async () => {
    const accessToken: string =
      'AqOdQESnch9CTB1gmScBYgaBoXXaC3KdzZT07Hg5CisM0wAAAYMXDxey';
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
});
