import {AxiosError} from 'axios';

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
  reviewId: number;
  userId: number;
  nickname: string;
  star: number;
  images: reviewImage[];
}

export interface reviewImage {
  url: string;
  filename: string;
  fileType: string;
}

export interface LaboratoriesResult {
  address: Address;
  distance: number;
  name: string;
  id: number;
  images: string[];
  reviewNum: number;
  star: number;
  x: number;
  y: number;
}

export interface LaboratoryResult {
  bills: string[];
  address: Address;
  distance: number;
  id: number;
  introduction: string;
  name: string;
  phone: string;
  reviewNum: number;
  reviews: Review[];
  star: number;
  background: string;
  homepage: string;
  instagram: string;
  blog: string;
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
  result: ResultPostAll[];
}

export interface ResultPostAll {
  category: string;
  commentNum: number;
  content: string;
  id: number;
  writer: Writer;
  time: string;
  title: string;
}

export interface PostDetail {
  code: number;
  isSuccess: boolean;
  message: string;
  result: ResultPostDetail;
}

export interface ResultPostDetail {
  category: string;
  comment?: Comment[];
  content: string;
  id: number;
  createdAt: string;
  images: Images[];
  title: string;
  writer: Writer;
}

export interface Images {
  fileName: string;
  fileType: string;
  url: string;
}

export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  nickname: string;
  picture: string;
  userId: number;
}

export interface Writer {
  id: number;
  nickname: string;
}

export interface PostSearch {
  code: number;
  isSuccess: boolean;
  message: string;
  result?: ResultPostSearch[];
}

export interface ResultPostSearch {
  category: string;
  commentNym: number;
  content: string;
  id: number;
  time: string;
  title: string;
  writer: Writer;
}

export interface nearbyLaboratories {
  code: number;
  id: number;
  isSuccess: boolean;
  message: string;
  result: LaboratoriesResult[];
}

export interface MyPage {
  code: number;
  isSuccess: boolean;
  message: string;
  result: ResultMypage;
}

export interface ResultMypage {
  id: number;
  image?: string;
  nickname: string;
  introduction?: string;
  email?: string;
}

export interface searchLaboratories {
  code: number;
  id: number;
  isSuccess: boolean;
  message: string;
  result: LaboratoriesResult[];
}

export interface postReview {
  code: number;
  isSuccess: boolean;
  message: string;
  result: number;
}

export interface image {
  uri: string;
  type: string;
  name: string;
}

export interface Auth {
  code: number;
  id: number;
  isSuccess: boolean;
  message: string;
  result: ResultAuth;
}

export interface ResultAuth {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
  registerStatus: string;
}
