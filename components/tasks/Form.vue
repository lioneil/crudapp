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

const { add, rules } = useTaskService();

const state = ref<Task>({
  id: props.state?.id ?? undefined,
  title: props.state?.title ?? '',
  completed: props?.state?.completed ?? false,
});

const onSubmit = async () => {
  await add(state.value);
  emit('submit', state.value);
  state.value = { id: undefined, title: '', completed: false };
};

const onInput = debounce(async () => {
  emit('input', state.value);
}, 800);
</script>

<template>
  <UCard :ui="{ body: 'sm:p-4 p-4' }" class="max-w-4xl">
    <UForm ref="uForm" :state="state" @submit.prevent="onSubmit">
      <div class="flex items-center gap-4">
        <span class="font-bold">New Task</span>
        <UInput
          v-model="state.title"
          :rules="rules"
          autofocus
          required
          class="flex-1"
          placeholder="Add a new task"
          @input="onInput"
        />
      </div>
    </UForm>
  </UCard>
</template>
