<script lang="ts" setup>
import { useAuth } from '~/composables/auth/useAuth';

const config = useRuntimeConfig();
const route = useRoute();
const { loading, setupUser } = useAuth();

useSeoMeta({
  title: route?.meta?.title || undefined,
});

useHead({
  titleTemplate: (title) => (title ? `${title} - ${config.app.name}` : `${config.app.name}`),
});

onMounted(() => setupUser());
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
