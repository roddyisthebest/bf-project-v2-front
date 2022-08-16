import {AxiosResponse} from 'axios';
import {api, response} from './index';

const authToken = (): Promise<AxiosResponse<response>> =>
  api.post('/token/authenticate');

const getAccessTokenByRefresh = (): Promise<AxiosResponse<response>> =>
  api.post('/token/refresh');

export {authToken, getAccessTokenByRefresh};
