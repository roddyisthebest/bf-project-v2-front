import {User} from './User';

export type TweetType = {
  id: number;
  img: string;
  content: string;
  User: User;
  createdAt: string | Date;
  updatedAt: string | Date;
};
