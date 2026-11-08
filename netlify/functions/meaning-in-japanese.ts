import { generateContent } from '../lib/gemini';
import { NetlifyEvent, NetlifyResponse, errorResponse, jsonResponse } from '../lib/http';

const SYSTEM_INSTRUCTION =
  'あなたは日本語の先生です。与えられた単語の日本語での意味を教えてください。';

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  const keyword = event.queryStringParameters?.keyword;

  if (!keyword) {
    return jsonResponse(400, { message: 'keyword is required' });
  }

  const prompt = `${keyword}という言葉は（日本語じゃない言葉です）の日本語での意味を教えてください。読み方も例文もあれば教えてください。重要: とても短く説明してください。最大限に２００文字でお願いします。`;

  try {
    const text = await generateContent(prompt, SYSTEM_INSTRUCTION);
    return jsonResponse(200, text);
  } catch (error) {
    return errorResponse(error);
  }
};
