import client from "./client";
import { Post, PostAll, PostDetail, PostSearch } from "./types";


export async function getPostAll() {
    const response = await client.get<PostAll[]>('/post');
    return response.data;
}


export async function getPostDetail(id:number) {
    const response = await client.get<PostDetail>(`/post/${id}`);
    return response.data;
}

export async function deletePost(id: number){
    await client.delete<Post>(`/post/${id}`);
    return null;
}

export async function getPostSearchTitle(keyword: string) {
    const response = await client.get<PostSearch>(`/post/search/title/${keyword}`);
    return response.data;
}



// export async function postNew(params: PostParams){
//     console.log(params);
//     const response = await client.post<Post>('/post/new', params, );
//     return response.data;
// }

// interface PostParams {
//     category: string,
//     content: string,
//     images: string,
//     title: string,
// }