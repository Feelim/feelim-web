import client from './client';
import {nearbyLaboratories} from './types';

export async function getNearbyLaboratories(x: number, y: number) {
  const response = await client.get<nearbyLaboratories>(
    `/laboratory/nearby?x=${x}&y=${y}`,
  );
  console.log(response.data);
  return response.data;
}
