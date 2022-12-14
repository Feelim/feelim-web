import axios from 'axios';

const baseURL = __DEV__ ? 'https://chalkak.shop' : 'https://chalkak.shop';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  client.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export default client;
