import axios from "axios";

export const fetcher = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3001/api/v1'
});