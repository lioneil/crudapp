<script setup lang="ts">
import type { Task } from '~/types/task';
import { useTaskService } from '~/composables/services/tasks/useTaskService';
import debounce from 'lodash/debounce';

const props = defineProps<{
  state: Task,
}>();

const emit = defineEmits<{
    (e: 'submit', v: Task): void;
    (e: 'input', v: Task): void;
}>();

const route = useRoute();
const router = useRouter();
const { add } = useTaskService();

const state = ref<Task>({
  id: props.state?.id ?? undefined,
  title: props.state?.title ?? route.query.q as string ?? '',
  completed: props?.state?.completed ?? false,
});

const onSubmit = async () => {
  await add(state.value);
  emit('submit', state.value);
  state.value = { id: undefined, title: '', completed: false };
  await router.push({ query: { q: '' } });
};

const onInput = debounce(async () => {
  emit('input', state.value);
}, 800);
</script>

<template>
  <UCard :ui="{ body: 'sm:p-4 p-4' }" class="max-w-4xl">
    <div class="flex items-center gap-4">
      <span class="font-bold">New Task</span>
      <UInput
        v-model="state.title"
        autofocus
        required
        class="flex-1"
        placeholder="Add a new task"
        @keydown.enter="onSubmit"
        @input="onInput"
      />
    </div>
  </UCard>
</template>
