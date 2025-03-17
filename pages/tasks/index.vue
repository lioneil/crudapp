<script setup lang="ts">
import TaskForm from '~/components/tasks/Form.vue';
import Container from '~/components/app/Container.vue';
import { useTaskService } from '~/composables/services/tasks/useTaskService';
import type { Task } from '~/types/task';

const { loading, items, useForm, list, add, update } = useTaskService();

await list();

const state = useForm();

definePageMeta({
  title: 'Tasks',
  layout: 'dashboard',
});
</script>

<template>
  <Container class="flex-col">
    <TaskForm :state="state" @submit="add" />
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
            :icon="row.original.completed ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
            :color="row.original.completed ? 'primary' : 'secondary'"
            variant="ghost"
            @click="update(row.original.id as string, { ...row.original, completed: !row.original.completed })"
          >{{ row.original.completed ? 'Mark as pending' : 'Mark as completed' }}</UButton>
        </template>
      </UTable>
    </UCard>
  </Container>
</template>
