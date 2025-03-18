<script setup lang="ts">
import { ref } from 'vue';

interface NavItem {
  label: string;
  icon: string;
  to: string;
}

const config = useRuntimeConfig();

const navItems = ref<NavItem[]>([
  { label: 'Dashboard', icon: 'i-heroicons-home', to: '/dashboard' },
  { label: 'Tasks', icon: 'i-heroicons-clipboard', to: '/tasks' },
  { label: 'Analytics', icon: 'i-heroicons-chart-bar', to: '/analytics' },
  { label: 'Settings', icon: 'i-heroicons-cog', to: '/settings' },
]);
</script>

<template>
  <aside class="sidebar fixed w-64 h-screen bg-gray-50 p-4 flex flex-col md:static md:w-64 md:h-auto md:flex-shrink-0">
    <h1 class="text-2xl font-bold mb-6 px-2">{{ config.app.name }}</h1>

    <nav>
      <ul class="space-y-2">
        <li v-for="item in navItems" :key="item.to">
          <ULink
            :to="item.to"
            class="flex items-center text-sm gap-3 px-3 py-2 rounded-lg hover:bg-primary-100 transition"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </ULink>
        </li>
      </ul>
    </nav>

    <div class="flex flex-col gap-4 mt-auto text-center">
      <LazyAppUserMenu class="hidden md:flex" />
      <p class="text-sm">&copy; {{ new Date().getFullYear() }} {{ config.app.name }}</p>
    </div>
  </aside>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
