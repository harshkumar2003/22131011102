import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // ✅ Your backend is on port 3001

export const createShortURL = async (data) => {
  const response = await axios.post(`${BASE_URL}/shorturls`, data);
  return response.data;
};

export const getStatsForShortcode = async (shortcode) => {
  const response = await axios.get(`${BASE_URL}/shorturls/${shortcode}`);
  return response.data;
};
