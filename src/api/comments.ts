import client from "./client";
import {Comment } from "./types";


export async function writeComment(params: {
    content: string;
    postId: number;
}) {
    const {content, postId} = params;
    console.log(content)
    const response = await client.post<Comment>
    (`/post/${postId}/comment/new`, {content},
    );
    return response.data;
}

