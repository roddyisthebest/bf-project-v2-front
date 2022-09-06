import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';

export type initialStateProps = {
  userInfo: User;
  isLoggedIn: boolean;
  refresh: boolean;
  newFeed: number;
  isAuth: boolean;
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
    newFeed: 0,
    isAuth: false,
  },
  reducers: {
    login: (state, {payload: log}: PayloadAction<boolean>) => ({
      ...state,
      isLoggedIn: log,
    }),
    logout: state => ({
      ...state,
      isLoggedIn: false,
      userInfo: {
        id: -1,
        oauth: '',
        name: '',
        img: '',
        Followers: [],
        Followings: [],
        Service: {
          penalty: false,
          pray: false,
          tweet: false,
        },
        refresh: false,
        newFeed: 0,
        isAuth: false,
      },
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
    setFeed: (state, {payload}: PayloadAction<boolean>) => ({
      ...state,
      newFeed: payload ? state.newFeed + 1 : 0,
    }),
    setAuth: (state, {payload}: PayloadAction<boolean>) => ({
      ...state,
      isAuth: payload,
    }),
    setUserName: (state, {payload}: PayloadAction<string>) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        name: payload,
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
  setFeed,
  setUserName,
  setAuth,
} = actions;
export default reducer;
