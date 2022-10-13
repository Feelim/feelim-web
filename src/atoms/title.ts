import { atom } from "recoil";

//커뮤니티 작성글
export const titleState = atom<string>({
    key: 'title', 
    default: '',
});
