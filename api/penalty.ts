import {AxiosResponse} from 'axios';
import {api, response} from './index';

const getPenaltys = (id: number): Promise<AxiosResponse<response>> =>
  api.get(`/penalty/${id}`);

export {getPenaltys};
