import { atom } from "recoil";


export const selectImgState = atom<string>({
    key: 'selectImg', 
    default: '',
});