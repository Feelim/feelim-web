import client from './client';
import {Post, PostAll, PostDetail, PostSearch} from './types';

export async function getPostAll({
  limit = 10,
  cursor,
}: {
  limit?: number;
  cursor?: number;
}) {
  const response = await client.get<PostAll>('/post', {
    params: {
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
    },
  });
  return response.data.result;
}

export async function getPostCategory(category: string) {
  const response = await client.get<PostAll>(`/post/category/${category}`);
  return response.data;
}

export async function getPostDetail(id: number) {
  const response = await client.get<PostDetail>(`/post/${id}`);
  return response.data;
}

export async function deletePost(id: number) {
  await client.patch<Post>(`/post/${id}/deletion`);
  return null;
}

export async function getPostSearchTitle(keyword: string) {
  const response = await client.get<PostSearch>(
    `/post/search/title?title=${keyword}`,
  );
  return response.data;
}

export async function reportPost(params: {
  etc: string;
  reason: string;
  postId: number;
}) {
  const {etc, reason, postId} = params;
  const response = await client.post<Post>(`/post/${postId}/report`, {
    etc,
    reason,
  });
  return response.data;
}

export async function getMyPost() {
  const response = await client.get<PostAll>('/post/my-post');
  return response.data;
}

export async function getMyComment() {
  const response = await client.get<PostAll>('/post/user/commenting');
  return response.data;
}
