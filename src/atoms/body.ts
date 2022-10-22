import { atom } from "recoil";

//커뮤니티 작성글
export const bodyState = atom<string>({
    key: 'body', 
    default: '',
});
