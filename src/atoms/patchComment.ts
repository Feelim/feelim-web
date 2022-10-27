import { atom } from "recoil";


export const patchCommentState = atom<number>({
    key: 'patchComment', 
    default: 0,
});

export const patchCommentContentState = atom<string>({
    key: 'patchCommentContent', 
    default: '',
});