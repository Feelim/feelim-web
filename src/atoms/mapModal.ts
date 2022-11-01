import {atom} from 'recoil';

export const mapModalState = atom<boolean>({
  key: 'mapModal',
  default: false,
});
