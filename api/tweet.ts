import {AxiosResponse} from 'axios';
import {api, response} from './index';

const getTweets = (lastId = -1): Promise<AxiosResponse<response>> =>
  api.get(`/tweet/${lastId}`);

const postTweet = (formData: FormData): Promise<AxiosResponse<response>> =>
  api.post('/tweet/', formData);

const deleteTweet = (id: number): Promise<AxiosResponse<response>> =>
  api.delete(`/tweet/${id}`);

export {getTweets, postTweet, deleteTweet};
