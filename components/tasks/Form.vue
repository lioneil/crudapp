<script setup lang="ts">
import type { Task } from '~/types/task';

const props = defineProps<{
  state: Task,
}>();

const emit = defineEmits<{
    (e: 'submit', v: Task): void;
}>();

const state = ref<Task>({
  id: props.state?.id ?? undefined,
  title: props.state?.title ?? '',
  completed: props?.state?.completed ?? false,
});
</script>

<template>
  <UCard :ui="{ body: 'sm:p-4 p-4' }" class="max-w-4xl">
    <UForm ref="uForm" :state="state" @submit="emit('submit', state)" class="flex gap-2">
      <UInput
        v-model="state.title"
        placeholder="Add a new task"
        required
        class="flex-1"
      />
      <UButton type="submit" icon="i-heroicons-plus-circle" class="cursor-pointer">Add</UButton>
    </UForm>
  </UCard>
</template>
