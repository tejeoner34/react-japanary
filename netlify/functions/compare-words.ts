import { generateContent } from '../lib/gemini';
import { NetlifyEvent, NetlifyResponse, errorResponse, jsonResponse } from '../lib/http';

const SYSTEM_INSTRUCTION =
  'You are a Japanese language teacher. Please explain the difference in nuance and context use of the given words in a simple way. Additionally, provide an example sentence for each word to help with understanding.';

const MAX_WORDS = 10;

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  let words: unknown;

  try {
    words = JSON.parse(event.body ?? '{}').words;
  } catch {
    return jsonResponse(400, { message: 'Invalid JSON body' });
  }

  if (!Array.isArray(words) || !words.every((word) => typeof word === 'string')) {
    return jsonResponse(400, { message: 'words must be an array of strings' });
  }

  if (words.length > MAX_WORDS) {
    return jsonResponse(400, { message: `words limit is ${MAX_WORDS}` });
  }

  const prompt = `${words.join(
    ', '
  )} can you please explain the difference in nuance and context use of these words in a simple way and add example sentence for each one so it is easier to understand? Give a short answer of maximum 200 characters`;

  try {
    const text = await generateContent(prompt, SYSTEM_INSTRUCTION);
    return jsonResponse(200, text);
  } catch (error) {
    return errorResponse(error);
  }
};
