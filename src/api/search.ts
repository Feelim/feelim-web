import client from './client';
import {nearbyLaboratories, searchLaboratories} from './types';

export async function getSearchLaboratory(keyword: string) {
  const response = await client.get<searchLaboratories>(
    `/laboratory/search?keyword=${keyword}`,
  );
  console.log(response.data);
  return response.data;
}
