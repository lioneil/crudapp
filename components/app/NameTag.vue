<script lang="ts" setup>
import { useAuth } from '~/composables/auth/useAuth';

const { loading, user, logout } = useAuth();
</script>

<template>
  <div role="button" class="flex items-center gap-2 px-2 py-1 rounded">
    <template v-if="loading">
      <USkeleton class="w-12 h-12 rounded-full" />
      <div>
        <USkeleton class="h-5 w-24 mb-1" />
        <USkeleton class="h-4 w-36" />
      </div>
    </template>

    <template v-else>
      <img v-if="user?.photoURL" :src="user.photoURL" :alt="user?.displayName" class="w-auto h-10 rounded-full" />
      <div>
        <h1 class="text-sm font-bold">{{ user?.displayName }}</h1>
        <p class="text-xs text-gray-500">{{ user?.email }}</p>
      </div>
    </template>
  </div>
</template>
