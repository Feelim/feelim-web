import { atom } from "recoil";


//커뮤니티 작성글
export const bodyState = atom<string>({
    key: 'bodyState', 
    default: '',
});

export const titleState = atom<string>({
    key: 'titleState', 
    default: '',
});

export const categoryState = atom<string>({
    key: 'categoryState', 
    default: 'FILM',
});

export const nameState = atom<string>({
    key: 'nameState', 
    default: '',
});
export const typeState = atom<string>({
    key: 'typeState', 
    default: '',
});
export const uriState = atom<string>({
    key: 'uriState', 
    default: '',
});