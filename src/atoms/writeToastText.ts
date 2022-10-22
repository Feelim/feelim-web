import {atom} from 'recoil';

export const writeToastTextState = atom<string>({
  key: 'writeToastText',
  default: '',
});
