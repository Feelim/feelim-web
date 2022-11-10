import client from './client';
import {nearbyLaboratories, searchLaboratories} from './types';

export async function getSearchLaboratory(
  keyword: string,
  x: number,
  y: number,
) {
  const response = await client.get<searchLaboratories>(
    `/laboratory/search?keyword=${keyword}&x=${x}&y=${y}`,
  );
  console.log(response.data);
  return response.data;
}
