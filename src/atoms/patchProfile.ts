import { atom } from "recoil";




export const patchProfileState = atom<boolean>({
    key: 'patchProfile', 
    default: false,
});