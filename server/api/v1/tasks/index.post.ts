import { create } from 'lodash';
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    return response._data;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from json-server',
    });
  }
});
