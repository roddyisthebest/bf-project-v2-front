import {AxiosResponse} from 'axios';
import {api, response} from './index';

const getPenaltys = (): Promise<AxiosResponse<response>> =>
  api.get('/penalty/');

export {getPenaltys};
