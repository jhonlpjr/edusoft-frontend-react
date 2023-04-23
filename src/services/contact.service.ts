import axios from 'axios';

const apiUrl = 'http://localhost:8075'; // Cambia esta URL por la de tu API

export const getContacts = () => {
  return axios.get(`${apiUrl}/contact`);
};

export const createContact = (contact) => {
  return axios.post(`${apiUrl}/contact`, contact);
};

export const updateContact = (id, contact) => {
  return axios.put(`${apiUrl}/contact/${id}`, contact);
};

export const deleteContact = (id) => {
  return axios.delete(`${apiUrl}/contact/${id}`);
};