<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';
import DashboardSidebar from '~/components/dashboard/Sidebar.vue';
import AppHeader from '~/components/app/Header.vue';
</script>

<template>
  <div class="min-h-screen flex">
    <DashboardSidebar />
    <main id="main" class="main max-w-full flex-1 bg-gray-100">
      <AppHeader />
      <div class="px-4 pb-10">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
