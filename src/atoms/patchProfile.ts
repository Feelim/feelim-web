import { atom } from "recoil";


export const patchProfileState = atom<boolean>({
    key: 'patchProfileState', 
    default: false,
});