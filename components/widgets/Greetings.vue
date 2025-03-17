<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { user } = useAuth();
</script>

<template>
  <UCard v-if="user" class="text-md">
    <div class="flex flex-row items-center">
      <p>👋&nbsp;<span class="italic">Welcome back</span>, {{ user.displayName }}!</p>
    </div>
  </UCard>
</template>
