<script setup lang="ts">
import TaskForm from '~/components/tasks/Form.vue';
import Container from '~/components/app/Container.vue';
import { useTaskService } from '~/composables/services/tasks/useTaskService';
import { type Task } from '~/types/task';
import moment from 'moment';

const { loading, items, metadata, useForm, list, update, on } = useTaskService();

await list();

const state = useForm();

const onItemClick = async (state: Task) => {
  await update(state.id as string, { ...state, completed: !state.completed });
}

on('tasks:updated', () => list());
on('tasks:added', () => list());

definePageMeta({
  title: 'Tasks',
  layout: 'dashboard',
});
</script>

<template>
  <Container class="flex-col items-start">
    <TaskForm :state="state" />
    <UCard :ui="{ body: 'sm:p-0 p-0' }" class="w-full max-w-full">
      <UTable
        :loading="loading"
        :data="items"
        :columns="[
          { accessorKey: 'title', header: 'Name' },
          { accessorKey: 'completed', header: 'Status' },
          { accessorKey: 'createdAt', header: 'Created' },
          { accessorKey: 'updatedAt', header: 'Updated' },
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
        <template v-slot:createdAt-cell="{ row }">
          <span>{{ moment(row.original.createdAt).fromNow() }}</span>
        </template>
        <template v-slot:updatedAt-cell="{ row }">
          <span>{{ moment(row.original.updatedAt).fromNow() }}</span>
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
      <span>Page {{ metadata.page }} of {{ metadata.pages }}</span>
      <UButton
        :disabled="metadata.page >= metadata.total"
        icon="i-heroicons-arrow-right"
        color="neutral"
        class="cursor-pointer"
        variant="ghost"
      />
    </div>
  </Container>
</template>
