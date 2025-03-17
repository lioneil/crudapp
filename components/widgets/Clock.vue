<script setup lang="ts">
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

const currentTime = ref<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

useIntervalFn(() => {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);
</script>

<template>
  <div class="font-light text-sm">
    <div class="flex flex-row gap-2 items-center">
      <UIcon name="i-lucide-clock" class="size-5" />
      <span>{{ currentTime }}</span>
    </div>
  </div>
</template>
