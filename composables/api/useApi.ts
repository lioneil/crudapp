type ApiOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: Record<string, any> | null;
  query?: Record<string, any>;
};

export const useApi = async <T>(
  endpoint: string,
  { method = 'GET', body = null, query = {} }: ApiOptions = {}
): Promise<T> => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const url = `${baseURL}${endpoint}`;

  try {
    return await $fetch<T>(url, {
      method: method.toUpperCase() as 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
      query,
      body: method.toUpperCase() !== 'GET' ? body : undefined,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch data from ${url}`,
    });
  }
};
