import { useApi } from '~/composables/api/useApi.js';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const response = await useApi('/tasks', {
      method: 'GET',
      query,
    });

    console.log(11, response);

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from json-server',
    });
  }
});
