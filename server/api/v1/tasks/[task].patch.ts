import { useApi } from '~/composables/api/useApi.js';

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'task'); // Extract task ID from route
  const body = await readBody(event);

  if (!taskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Task ID is required',
    });
  }

  if (typeof body?.completed !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid completed status is required',
    });
  }

  try {
    const response = await useApi(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: {
        ...body,
        updatedAt: new Date().toISOString(),
      },
    });

    return response._data;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update task in json-server',
    });
  }
});
