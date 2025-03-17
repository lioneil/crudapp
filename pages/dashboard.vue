<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';
import Container from '~/components/app/Container.vue';

const { loading, user, logout } = useAuth();

definePageMeta({
  title: 'Dashboard',
  layout: 'dashboard',
});
</script>

<template>
  <Container class="flex-col items-start">
    <LazyWidgetsGreetings />

    <LazyWidgetsRecentTasks />
  </Container>
</template>
