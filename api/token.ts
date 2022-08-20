import {AxiosResponse} from 'axios';
import {api, response} from './index';

const authToken = (): Promise<AxiosResponse<response>> =>
  api.post('/token/authenticate');

const getAccessTokenByRefresh = (
  refreshToken: string,
): Promise<AxiosResponse<response>> =>
  api.post('/token/refresh', {refreshToken});

export {authToken, getAccessTokenByRefresh};
