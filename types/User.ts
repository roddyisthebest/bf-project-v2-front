import {PrayType} from './Pray';

export type User = {
  id: number;
  oauth: 'KAKAO';
  name: string;
  img: string;
  Prays: PrayType[] | null;
  payed: boolean;
};
