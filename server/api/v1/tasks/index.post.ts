import { useApi } from '~/composables/api/useApi.js';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body?.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Task title is required',
      });
    }

    const response = await useApi('/tasks', {
      method: 'POST',
      body: {
        title: body.title,
        completed: false,
      },
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from json-server',
    });
  }
});
