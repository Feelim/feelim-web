import { atom } from "recoil";

export const categoryFilterState = atom<number>({
    key: 'categoryFiltersState', 
    default: 0,
});