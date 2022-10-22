import {AxiosResponse} from 'axios';
import client from './client';
import {Laboratories, Laboratory} from './types';

export async function getLaboratories() {
  const response = await client.get<Laboratories>('/laboratory');
  return response.data;
}

export async function getLaboratory(id: number) {
  const response = await client.get<Laboratory>(`/laboratory/${id}`);
  return response.data;
}
