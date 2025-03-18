import { useBaseService, type ListOptions, type MetadataOptions } from '~/composables/services/useBaseService.js';
import type { Task } from '~/types/task';
import cloneDeep from 'lodash/cloneDeep';

export interface TaskResponse {
  data: Task[];
  meta: MetadataOptions;
}

export const useTaskService = () => {
  const $service = useBaseService('tasks');
  const $route = useRoute();
  const query = computed(() => $route.query);

  const useForm = () => useState<Task>('tasks.form', () => ({
    id: undefined,
    title: undefined,
    completed: false,
  }));

  const list = async (options: ListOptions = {}) => {
    try {
      $service.startLoading();

      const { data, error, refresh } = await useAsyncData<TaskResponse>('tasks', () =>
        $fetch('/api/v1/tasks', {
          params: { ...options, ...cloneDeep(query.value) },
        })
      );

      if (error.value) throw error.value;

      $service.setItems(data.value?.data || []);
      $service.setMetadata(data.value?.meta || {});

      $service.emit('tasks:loaded', { refresh });
    } catch (e: unknown) {
      console.error('Failed to fetch tasks:', e);
    } finally {
      $service.stopLoading();
    }
  };

  const add = async (data: Task) => {
    try {
      $service.startLoading();

      const task = await $service.api('/api/v1/tasks', {
        method: 'post',
        body: JSON.stringify({ title: data.title, completed: false }),
      });

      if (!task) throw new Error('Failed to add task');

      $service.emit('tasks:added', { task });
    } catch (e: unknown) {
      console.error('Failed to add task:', e);
    } finally {
      $service.stopLoading();
    }
  };

  const update = async (id: string, data: Task) => {
    try {
      $service.startLoading();

      const task = await $service.api(`/api/v1/tasks/${id}`, {
        method: 'patch',
        body: data,
      });

      if (!task) throw new Error('Failed to update task');

      $service.emit('tasks:updated', { task });
    } catch (e: unknown) {
      console.error('Failed to update task:', e);
    } finally {
      $service.stopLoading();
    }
  };

  return $service.merge({
    useForm,
    list,
    add,
    update,
  });
};
