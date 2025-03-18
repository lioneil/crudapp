<script setup lang="ts">
import TaskForm from '~/components/tasks/Form.vue';
import Container from '~/components/app/Container.vue';
import { useTaskService } from '~/composables/services/tasks/useTaskService';
import { type Task } from '~/types/task';

const $router = useRouter();
const { loading, items, metadata, useForm, list, update, on } = useTaskService();

await list();

const state = useForm();

const page = ref(1);
const itemsPerPage = 10;

const paginatedItems = computed(() =>
  items.value.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage)
);

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));


const onSearch = async (state: Task) => {
  await $router.push({ query: { q: state.title } });
  await list();
}

const onItemClick = async (state: Task) => {
  await update(state.id as string, { ...state, completed: !state.completed });
}

on('tasks:updated', list);

definePageMeta({
  title: 'Tasks',
  layout: 'dashboard',
});
</script>

<template>
  <Container class="flex-col items-start">
    <TaskForm :state="state" @input="onSearch" />
    <UCard :ui="{ body: 'sm:p-0 p-0' }" class="w-full">
      <UTable
        :loading="loading"
        :data="items"
        :columns="[
          { accessorKey: 'title', header: 'Name' },
          { accessorKey: 'completed', header: 'Status' },
        ]"
        :column-visibility="{ id: false  }"
        class="flex-1"
      >
        <template v-slot:title-cell="{ row }">
          <span :class="{ 'line-through': row.original.completed }">{{ row.original.title }}</span>
        </template>
        <template v-slot:completed-cell="{ row }">
          <UButton
            :icon="row.original.completed ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'"
            :color="row.original.completed ? 'secondary' : 'primary'"
            variant="ghost"
            type="button"
            @click.stop="onItemClick(row.original as Task)"
          >
            {{ row.original.completed ? 'Mark as pending' : 'Mark as completed' }}
          </UButton>
        </template>
      </UTable>

    </UCard>
    <div class="flex my-4 justify-end items-center gap-2">
      <UButton
        :disabled="metadata.page === 1"
        icon="i-heroicons-arrow-left"
        color="neutral"
        class="cursor-pointer"
        variant="ghost"
        @click="metadata.page--"
      />
      <span>Page {{ page }} of {{ metadata.pages }}</span>
      <UButton
        :disabled="metadata.page >= metadata.total"
        icon="i-heroicons-arrow-right"
        color="neutral"
        class="cursor-pointer"
        variant="ghost"
        @click="onNext"
      />
    </div>
  </Container>
</template>
