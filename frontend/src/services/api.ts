import axios from 'axios';

// THE FIX IS HERE: We use the Vercel environment variable
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    const token = JSON.parse(profile).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth routes
export const signUp = (formData: any) => API.post('/api/auth/register', formData);
export const signIn = (formData: any) => API.post('/api/auth/login', formData);

// Notes routes
export const fetchNotes = () => API.get('/api/notes');
export const createNote = (newNote: any) => API.post('/api/notes', newNote);
export const deleteNote = (id: string) => API.delete(`/api/notes/${id}`);