import axiosClient from './axiosClient';

export const generateNote = async (formData) => {
  return await axiosClient.post('/notes/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllNotes = async (subject = '') => {
  return await axiosClient.get(`/notes?subject=${subject}`);
};

export const getNoteById = async (id) => {
  return await axiosClient.get(`/notes/${id}`);
};

export const deleteNote = async (id) => {
  return await axiosClient.delete(`/notes/${id}`);
};