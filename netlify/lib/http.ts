export interface NetlifyEvent {
  httpMethod: string;
  queryStringParameters: Record<string, string | undefined> | null;
  body: string | null;
}

export interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const jsonResponse = (statusCode: number, payload: unknown): NetlifyResponse => ({
  statusCode,
  headers: JSON_HEADERS,
  body: JSON.stringify(payload),
});

export const errorResponse = (error: unknown): NetlifyResponse =>
  jsonResponse(500, {
    message: error instanceof Error ? error.message : 'Unexpected error',
  });
