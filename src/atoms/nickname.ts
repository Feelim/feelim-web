import { atom } from "recoil";

//사용자가 설정한 닉네임
export const nickNameState = atom<string>({
    key: 'nickName', 
    default: '',
});