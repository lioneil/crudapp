import type { TypedInternalResponse, NitroFetchRequest } from 'nitropack';
import type { FetchResponse } from 'ofetch';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: Record<string, any> | null;
  query?: Record<string, any>;
};

export const useApi = async <T>(
  endpoint: string,
  { method = 'GET', body = null, query = {} }: ApiOptions = {}
): Promise<FetchResponse<T>> => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const url = `${baseURL}${endpoint}`;

  try {
    const response = await $fetch.raw<T>(url, {
      method: method.toUpperCase() as 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
      query,
      body: method.toUpperCase() !== 'GET' ? body : undefined,
      headers: { 'Content-Type': 'application/json' },
      retryDelay: 1000,
      retry: 3,
    })

    return response as FetchResponse<T>;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch data from ${url}`,
    });
  }
};
