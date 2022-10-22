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
