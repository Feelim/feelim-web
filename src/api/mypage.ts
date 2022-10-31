import client from "./client";
import { MyPage } from "./types";



export async function getMyProfile() {
    const response = await client.get<MyPage>('home/my-page');
    return response.data;
}

