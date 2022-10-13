import client from './client';
import {Laboratory} from './types';

export async function getLaboratories() {
  const response = await client.get<Laboratory>('/laboratory');
  return response.data;
}
