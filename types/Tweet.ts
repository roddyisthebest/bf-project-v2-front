import {User} from './User';

export type TweetType = {
  id: number;
  img: string;
  content: string;
  User: User;
  createdAt: Date;
  updatedAt: Date;
};
