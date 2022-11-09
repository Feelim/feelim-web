import client from "./client";
import { Auth} from "./types";

export async function authToken(params: AuthParams){
    const response = await client.post<Auth>(`/auth/token?accessToken=${params.accessToken}&refreshToken=${params.refreshToken}`,)
    return response.data;
}

interface AuthParams{
    accessToken: string;
    refreshToken: string;
}