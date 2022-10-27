import { atom } from "recoil";




export const patchImgNameState = atom<string>({
    key: 'patchImgName', 
    default: '',
});

export const patchImgUrlState = atom<string>({
    key: 'patchImgUrl', 
    default: '',
});

export const patchImgTypeState = atom<string>({
    key: 'patchImgType', 
    default: '',
});