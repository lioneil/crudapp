<script setup lang="ts">
import { useTaskService } from '~/composables/services/tasks/useTaskService';

const { loading, list, items, update } = useTaskService();
await list({ _limit: 5 });
</script>

<template>
  <UCard :ui="{ body: 'sm:p-0 p-0' }" class="min-w-2xs">
    <template #header>
      <h1 class="flex gap-2 items-center font-bold">
        <UIcon name="i-heroicons-clipboard" class="w-5 h-5" />
        <span>Recent Tasks</span>
      </h1>
    </template>
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
    <template #footer>
      <div class="text-end">
        <ULink to="/tasks" class="text-sm">View All Tasks</ULink>
      </div>
    </template>
  </UCard>
</template>
