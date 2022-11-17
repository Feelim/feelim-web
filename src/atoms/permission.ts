import { atom } from "recoil";


export const permissionImageState = atom<string>({
    key: 'permissionImage', 
    default: 'granted',
});

export const permissionCameraState = atom<string>({
    key: 'permissionCamera', 
    default: 'granted',
});

export const androidCountState = atom<number>({
    key: 'androidCount',
    default: 0,
})