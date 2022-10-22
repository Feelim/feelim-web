import { AxiosError } from "axios";

export interface Laboratories {
  code: number;
  id: number;
  isSuccess: boolean;
  message: string;
  result: LaboratoriesResult[];
}

export interface Laboratory {
  code: number;
  isSuccess: boolean;
  message: string;
  result: LaboratoryResult;
}

export interface Review {
  content: string;
  id: number;
  nickname: string;
  star: number;
}

export interface LaboratoriesResult {
  address: Address;
  distance: number;
  name: string;
  id: number;
  images: string[];
  reviewNum: number;
  star: number;
}

export interface LaboratoryResult {
  bills: string[];
  distance: number;
  id: number;
  introduction: string;
  name: string;
  phone: string;
  reviewNum: number;
  reviews: Review[];
  star: number;
  url: string;
}

export interface Address {
  city: string;
  province: string;
  street: string;
}

export interface Post {
  code: number;
  isSuccess: boolean;
  message: string;
  result: number;
}

export interface PostAll {
  code: number;
  isSuccess: boolean;
  message: string;
  result: ResultPostAll;
}

export interface ResultPostAll {
  category: string,
  commentNum: number,
  content: string,
  id: number,
  nickname: string,
  time: string,
  title: string,
}

export interface PostDetail {
  code: number;
  isSuccess: boolean;
  message: string;
  result?: ResultPostDetail;
}

export interface ResultPostDetail {
  category: string,
  comment?: Comment[],
  content: string,
  id: number,
  createdAt: string,
  images?: string[],
  title: string,
  writer: Writer,
}

export interface Comment {
  content: string,
  createdAt: string,
  id: number,
  nickname: string,
  picture: string,
  userId: number,
}

export interface Writer{
  id: number,
  nickname: string,
}

export interface PostSearch {
  code: number;
  isSuccess: boolean;
  message: string;
  result?: ResultPostSearch[];
}

export interface ResultPostSearch {
  category: string,
  commentNym: number,
  content: string,
  id: number,
  time: string,
  title: string,
  writer: Writer,
}
