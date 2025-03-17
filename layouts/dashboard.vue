<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';
import DashboardSidebar from '~/components/dashboard/Sidebar.vue';
import AppHeader from '~/components/app/Header.vue';
</script>

<template>
  <div class="h-screen flex">
    <DashboardSidebar />
    <main class="flex-1 bg-gray-100">
      <AppHeader />
      <div class="px-4">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
