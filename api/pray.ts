import {AxiosResponse} from 'axios';
import {api, response} from './index';

const getPrays = (id: number): Promise<AxiosResponse<response>> =>
  api.get(`pray/${id}`);

const getPraysByDate = (date: string): Promise<AxiosResponse<response>> =>
  api.get(`/pray/${date}`);

const getPraysExistence = (date: string): Promise<AxiosResponse<response>> =>
  api.get(`/pray/check/${date}`);

const postPray = (id: number): Promise<AxiosResponse<response>> =>
  api.post('/pray/', {content: '새로운 기도제목입니다.', id});

const updatePray = (
  id: number,
  userId: number,
  content: string,
): Promise<AxiosResponse<response>> => api.put('/pray/', {id, content, userId});

const deletePray = (id: number): Promise<AxiosResponse<response>> =>
  api.delete(`/pray/${id}`);

export {
  getPrays,
  getPraysByDate,
  getPraysExistence,
  postPray,
  updatePray,
  deletePray,
};
