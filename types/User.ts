import {PenaltyType} from './Penalty';
import {PrayType} from './Pray';
import {Service} from './service';

export type User = {
  id: number;
  oauth: 'KAKAO';
  name: string;
  img: string;
  Prays: PrayType[] | null;
  payed: boolean;
  Penalties: PenaltyType[];
  Followers: User[];
  Followings: User[];
  service: Service;
  createdAt: Date;
  updatedAt: Date;
};
