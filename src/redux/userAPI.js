import axios from "axios";
//config axios
export const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});

//USER API
export const login = (data) => API.post('/auth/signin', data);
export const signInWithGoogle = (data) => API.post('/auth/google', data);
export const signup = (data) => API.post('/auth/register', data);
export const listUserSub = () => API.get('/users/subscriptions');

//Video API
export const getVideoById = (videoId) => API.get(`/videos/find/${videoId}`);
export const getAllUserVideos = () => API.get(`/videos/AllVideo`);
export const getVideosLikes = () => API.get(`/videos/videosLiked`);
export const getVideosSaved = () => API.get(`/videos/videosSaved`);

//Comment API
export const GetComment = (videoId) => API.get(`comments/${videoId}`);
export const AddComment = (data) => API.post(`/comments`, data);