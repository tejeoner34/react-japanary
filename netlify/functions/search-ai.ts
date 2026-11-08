import { generateContent } from '../lib/gemini';
import { NetlifyEvent, NetlifyResponse, errorResponse, jsonResponse } from '../lib/http';

const SYSTEM_INSTRUCTION =
  'あなたは日本語の先生です。まずは読み方を教えてください、その後、似てる言葉と英語での意味を教えてください。後、説明は短くして最大限に３００文字でお願いします。後、例文を教えてください。また、日本語には古い言葉や地方しかで利用されていない言葉と表現はたくさんありますので、それについても教えてほしいです。もしもう利用されていない言葉や表現があれば、現在の表現とかあと、地方の言葉ならそれも教えてください。';

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  const keyword = event.queryStringParameters?.keyword;

  if (!keyword) {
    return jsonResponse(400, { message: 'keyword is required' });
  }

  try {
    const text = await generateContent(`${keyword}とはどういう意味ですか?`, SYSTEM_INSTRUCTION);
    return jsonResponse(200, text);
  } catch (error) {
    return errorResponse(error);
  }
};
