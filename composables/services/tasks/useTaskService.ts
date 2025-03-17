import type { Task } from '~/types/task';

export const useTaskService = () => {
  const loading = useState<boolean>('tasks.loading', () => false);
  const items = useState<Task[]>('tasks.data', () => []);

  const useForm = () => useState<Task>('tasks.form', () => ({
    id: undefined,
    title: '',
    completed: false,
  }));

  const list = async () => {
    loading.value = true;

    try {
      const { data, error, refresh } = await useAsyncData<Task[]>('tasks', () =>
        $fetch('/api/v1/tasks')
      );

      if (error.value) throw error.value;

      if (data.value) {
        items.value = data.value;
      }

      return { refresh };
    } catch (e) {
      console.error('Failed to fetch tasks:', e);
    } finally {
      loading.value = false;
    }
  };

  const add = async (data: Task) => {
    try {
      loading.value = true;
      await useFetch('/api/v1/tasks', { method: 'post', body: JSON.stringify({ title: data.title }) });

      await list();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  const update = async (id: string, data: Task) => {
    try {
      loading.value = true;
      await useFetch(`/api/v1/tasks/${id}`, { method: 'patch', body: JSON.stringify(data) });
      loading.value = false;

      await list();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    items,
    useForm,
    list,
    add,
    update,
  };
};
