import { useApi } from '~/composables/api/useApi.js';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = parseInt(query._page as string, 10) || 1;
  const limit = parseInt(query._limit as string, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const response = await useApi('/tasks', {
      method: 'GET',
      query: {
        ...query,
        q: query.q || '',
        _sort: 'updatedAt',
        _order: 'desc',
        _start: offset,
        _limit: limit,
      },
    });

    const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);

    return {
      data: response._data,
      meta: {
        total,
        page,
        pages: Math.max(1, Math.ceil(total / limit)),
        limit,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from json-server',
    });
  }
});
