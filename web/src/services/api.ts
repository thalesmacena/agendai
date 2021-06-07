import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL
});

export const ruApi = axios.create({
  baseURL: process.env.RU_URL
});

export const loginApi = axios.create({
  baseURL: process.env.LOGIN_URL
});
