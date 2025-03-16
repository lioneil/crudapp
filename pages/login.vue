<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { login } = useAuth();

definePageMeta({
  title: 'Login',
  layout: 'auth',
});
</script>

<template>
  <div class="flex items-center justify-center">
    <UButton @click="login" color="primary">
      Login with Google
    </UButton>
  </div>
</template>
