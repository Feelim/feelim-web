import { atom } from "recoil";

//카카오 로그인시 사용자 이메일
export const emailState = atom<string>({
    key: 'email', 
    default: '',
});

