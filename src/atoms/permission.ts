import { atom } from "recoil";


export const permissionImageState = atom<string>({
    key: 'permissionImage', 
    default: '',
});

export const androidCountState = atom<number>({
    key: 'androidCount',
    default: 0,
})