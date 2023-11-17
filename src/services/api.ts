import { AppError } from '@utils/AppError';
import { localUrl } from '@utils/baseUrls';
import axios from 'axios'
const api = axios.create({
  baseURL: `${localUrl}/api`
})

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message));
  } else {
    return Promise.reject(new AppError(error));
  }
})

export { api }