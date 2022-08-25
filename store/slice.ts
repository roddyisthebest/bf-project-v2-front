import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';

export type initialStateProps = {
  userInfo: User;
  isLoggedIn: boolean;
  refresh: boolean;
};

const {actions, reducer} = createSlice({
  name: 'redux',
  initialState: {
    userInfo: {
      id: 1,
      oauth: '',
      name: '조유리',
      img: 'https://thumbs.gfycat.com/ArcticSlimCommabutterfly-max-1mb.gif',
      Followers: [] as User[],
      Followings: [] as User[],
      Service: {
        penalty: false,
        pray: false,
        tweet: false,
      },
    },
    isLoggedIn: false,
    refresh: false,
  },
  reducers: {
    login: (state, {payload: log}: PayloadAction<boolean>) => ({
      ...state,
      isLoggedIn: log,
    }),
    logout: state => ({
      ...state,
      isLoggedIn: false,
    }),
    setUserInfo: (state, {payload}: PayloadAction<User>) => ({
      ...state,
      userInfo: {
        id: payload.id,
        oauth: payload.oauth,
        name: payload.name,
        img: payload.img,
        Followers: payload.Followers,
        Followings: payload.Followings,
        Service: payload.Service,
      },
    }),
    setFollowings: (state, {payload}: PayloadAction<User>) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        Followings: [...state.userInfo.Followings, payload],
      },
    }),
    deleteFollowings: (state, {payload}: PayloadAction<number>) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        Followings: state.userInfo.Followings.filter(e => e.id !== payload),
      },
    }),
    setRefresh: (state, {payload}: PayloadAction<boolean>) => ({
      ...state,
      refresh: payload,
    }),
    setService: (
      state,
      {payload}: PayloadAction<'penalty' | 'pray' | 'tweet'>,
    ) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        Service: {
          ...state.userInfo.Service,
          [payload]: !state.userInfo.Service[payload],
        },
      },
    }),
  },
});

export const {
  login,
  logout,
  setUserInfo,
  setFollowings,
  deleteFollowings,
  setRefresh,
  setService,
} = actions;
export default reducer;
