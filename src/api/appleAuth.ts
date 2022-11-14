import client from './client';
import {nearbyLaboratories, searchLaboratories} from './types';

export async function getAppleLogin() {
  const response = await client.get<string>('/auth/getAppleAuthUrl');
  console.log(response.data);
  return response.data;
}

export async function getAppleLoginInfo() {
  const response = await client.get<string>('/login/oauth2/apple');
  console.log(response.data);
  return response.data;
}
