import {atom} from 'recoil';

export const mapModalHeightState = atom<number>({
  key: 'mapModalHeight',
  default: 100,
});
