import http from '@/utils/axios';

export const getHello = () => http.get('/hello/');
