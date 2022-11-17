import client from './client';
import {Comment, Post} from './types';

export async function writeComment(params: {content: string; postId: number}) {
  const {content, postId} = params;
  const response = await client.post<Comment>(`/post/${postId}/comment/new`, {
    content,
  });
  return response.data;
}

export async function deleteComment(params: {
  postId: number;
  commentId: number;
}) {
  const {postId, commentId} = params;
  await client.patch<Post>(`/post/${postId}/comment/${commentId}/deletion`);
  return null;
}

export async function patchComment(params: {
  postId: number;
  commentId: number;
  content: string;
}) {
  const {postId, commentId, content} = params;
  const response = await client.patch<Post>(
    `/post/${postId}/comment/${commentId}/modification`,
    {content},
  );
  return response.data;
}
