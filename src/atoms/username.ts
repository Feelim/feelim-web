import { atom } from "recoil";

//카카오 로그인시 사용자 이름
export const usernameState = atom<string>({
    key: 'username', 
    default: '',
});

