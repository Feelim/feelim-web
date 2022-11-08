import { atom } from "recoil";


export const permissionImageState = atom<string>({
    key: 'permissionImage', 
    default: '',
});

export const permissionCameraState = atom<string>({
    key: 'permissionCamera', 
    default: '',
});

export const androidCountState = atom<number>({
    key: 'androidCount',
    default: 0,
})