import axios from 'axios';

const client = axios.create({
  baseURL: 'https://service.puzzle3.cc/api/metadata'
});

export { client };
