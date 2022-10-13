import { atom } from "recoil";

export const writeToastState = atom<boolean>({
    key: 'writeToast', 
    default: false,
});

