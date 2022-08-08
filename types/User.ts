import {PrayType} from './Pray';

export type User = {
  id: number;
  oauth: 'KAKAO';
  name: string;
  img: string;
  Pray: PrayType[] | null;
};
