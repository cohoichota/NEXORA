import type { ApiError } from '@nexora/shared-types';

// ── API Client ───────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: ApiError,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // send cookies (refresh token)
    ...options,
  });

  if (!response.ok) {
    let errorData: ApiError | undefined;
    try {
      errorData = (await response.json()) as ApiError;
    } catch {
      // ignore parse error
    }
    throw new ApiClientError(
      response.status,
      errorData?.message ?? `HTTP ${response.status}`,
      errorData,
    );
  }

  // Handle 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── HTTP Methods ──────────────────────────────────────────────────

export const apiClient = {
  get: <T>(path: string, headers?: HeadersInit): Promise<T> =>
    request<T>(path, { method: 'GET', headers }),

  post: <T>(path: string, body?: unknown, headers?: HeadersInit): Promise<T> =>
    request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  patch: <T>(path: string, body?: unknown, headers?: HeadersInit): Promise<T> =>
    request<T>(path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  put: <T>(path: string, body?: unknown, headers?: HeadersInit): Promise<T> =>
    request<T>(path, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  delete: <T>(path: string, headers?: HeadersInit): Promise<T> =>
    request<T>(path, { method: 'DELETE', headers }),
};

export { ApiClientError };
export type { ApiError };
