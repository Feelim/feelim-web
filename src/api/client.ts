import axios from 'axios';


const baseURL = __DEV__
  ? 'http://chalkak-env-1.eba-rbm59tk3.ap-northeast-2.elasticbeanstalk.com/'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

// client.defaults.headers.common['Authorization']  = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwa25vamxoMjdAZGF1bS5uZXQiLCJyb2xlIjoidXNlciIsIm15TmFtZSI6InBrbm9qbGgyN0BkYXVtLm5ldCIsImV4cCI6MTY2NjM4MTA4OCwiaWF0IjoxNjY2MzYzMDg4fQ.XWCwwju88A6blN5u8ZdtD_0SWLx4TEnVa3IBlgqsq2Y`

export function applyToken(jwt: string){
  client.defaults.headers.common['Authorization']  = `Bearer ${jwt}`;
}


export default client;
