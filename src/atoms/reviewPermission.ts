import {atom} from 'recoil';

export const loginState = atom<boolean>({
  key: 'reviewLogin',
  default: false,
});

export const visibleState = atom<boolean>({
  key: 'reviewVisible',
  default: false,
});
