import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/';
export async function searchWord(word: string) {
  const response = await axios.get(`${BASE_URL}?keyword=${word}`);
  console.log(response);
  return response.data;
}
