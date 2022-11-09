import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import client from './client';
import {image, postReview} from './types';

const token = AsyncStorage.getItem('accessToken');

export async function writeReview(params: {
  content: string;
  star: number;
  id: number;
  images: image;
  laboratoryId: number;
}) {
  const {id, content, star, images, laboratoryId} = params;
  const response = await client.post<postReview>(`/laboratory/${id}/new`, {
    params: {
      content,
      star,
      images,
      laboratoryId,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
