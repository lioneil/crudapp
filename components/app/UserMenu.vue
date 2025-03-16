<script lang="ts" setup>
import { useAuth } from '~/composables/auth/useAuth';
import NameTag from '~/components/app/NameTag.vue';

const { logout } = useAuth();
const items = ref([
  { label: 'Tasks', icon: 'i-heroicons-clipboard', to: '/tasks' },
  { label: 'Analytics', icon: 'i-heroicons-chart-bar', to: '/analytics' },
  { label: 'Settings', icon: 'i-heroicons-cog', to: '/settings' },
  { label: 'Logout', icon: 'i-heroicons-arrow-left', onSelect: logout },
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-48'
    }"
  >
    <NameTag class="hover:bg-gray-200 cursor-pointer" />
  </UDropdownMenu>
</template>
