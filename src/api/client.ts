import axios from 'axios';

const baseURL = __DEV__
  ? 'http://chalkak-env-1.eba-rbm59tk3.ap-northeast-2.elasticbeanstalk.com/'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export default client;
