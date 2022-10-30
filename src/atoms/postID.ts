import { atom } from "recoil";

export const postIDState = atom<number>({
    key: 'postid', 
    default: 0,
});