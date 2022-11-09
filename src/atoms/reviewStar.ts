import {atom} from 'recoil';

export const reviewStarState = atom<number>({
  key: 'reviewStar',
  default: 0,
});
