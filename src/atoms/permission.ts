import { atom } from "recoil";


export const permissionImageState = atom<string>({
    key: 'permissionImage', 
    default: '',
});