import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const createShortURL = async (data) => {
  const response = await axios.post(`${BASE_URL}/shorturls`, data);
  return response.data;
};

export const getStatsForShortcode = async (shortcode) => {
  const response = await axios.get(`${BASE_URL}/shorturls/${shortcode}`);
  return response.data;
};
