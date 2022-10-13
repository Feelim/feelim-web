export interface Laboratory {
  code: number;
  isSuccess: boolean;
  message: string;
  result: Result[];
}

export interface Result {
  address: Address;
  distance: number;
  name: string;
  id: number;
  images: string[];
  reviewNum: number;
  star: number;
}

export interface Address {
  city: 'string';
  province: 'string';
  street: 'string';
}
