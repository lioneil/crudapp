<script setup lang="ts">
import { useTaskService } from '~/composables/services/tasks/useTaskService';

const { loading, list, items } = useTaskService();
await list();
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
      :column-visibility="{ id: false  }"
      class="flex-1"
    />
    <template #footer>
      <div class="text-end">
        <ULink to="/tasks" class="text-sm">View All Tasks</ULink>
      </div>
    </template>
  </UCard>
</template>
