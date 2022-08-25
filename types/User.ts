import {PenaltyType} from './Penalty';
import {PrayType} from './Pray';
import {ServiceType} from './ServiceType';

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
  Service: ServiceType;
  createdAt: Date;
  updatedAt: Date;
};
