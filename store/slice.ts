import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';

export type initialStateProps = {
  userInfo: User;
  isLoggedIn: boolean;
};

const {actions, reducer} = createSlice({
  name: 'redux',
  initialState: {
    userInfo: {
      id: 1,
      oauth: '',
      name: '조유리',
      img: 'https://thumbs.gfycat.com/ArcticSlimCommabutterfly-max-1mb.gif',
    },
  },
  reducers: {
    login: (state, {payload: log}: PayloadAction<boolean>) => ({
      ...state,
      isLoggedIn: log,
    }),
  },
});

export const {login} = actions;
export default reducer;
