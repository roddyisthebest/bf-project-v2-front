import {AxiosResponse} from 'axios';
import {api, response} from './index';

const getMyInfo = (): Promise<AxiosResponse<response>> => api.get('/user');

const getInfoById = (id: number): Promise<AxiosResponse<response>> =>
  api.get(`/user/${id}/info`);

const logoutNode = (): Promise<AxiosResponse<response>> =>
  api.post('/user/logout');

const authCode = (code: string): Promise<AxiosResponse<response>> =>
  api.post('/user/auth/code', {code});

const saveMyInfo = (name: string): Promise<AxiosResponse<response>> =>
  api.put('/user/', {name});

const saveMyService = ({
  tweet,
  pray,
  penalty,
}: {
  tweet: boolean;
  pray: boolean;
  penalty: boolean;
}): Promise<AxiosResponse<response>> => {
  return api.put('/user/service', {tweet, pray, penalty});
};

const saveFollow = (
  isFollow: boolean,
  id: number,
): Promise<AxiosResponse<response>> => api.post('/user/follow', {isFollow, id});

const checkPayed = (
  id: number,
  payed: boolean,
): Promise<AxiosResponse<response>> => api.post('/user/check', {payed, id});

const getPenaltysByUserId = (
  id: number,
  lastId: number,
): Promise<AxiosResponse<response>> =>
  api.get(`/user/${id}/penaltys/${lastId}`);

const getTweetsByUserId = (
  id: number,
  lastId: number,
): Promise<AxiosResponse<response>> => api.get(`/user/${id}/tweets/${lastId}`);

const getPraysByUserId = (
  id: number,
  lastId: number,
): Promise<AxiosResponse<response>> => api.get(`/user/${id}/prays/${lastId}`);

export {
  getMyInfo,
  getInfoById,
  logoutNode,
  authCode,
  saveMyInfo,
  saveMyService,
  saveFollow,
  checkPayed,
  getPenaltysByUserId,
  getTweetsByUserId,
  getPraysByUserId,
};
