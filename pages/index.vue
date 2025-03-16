<script setup lang="ts">
onMounted(() => {
  const user = useState('auth.user');
  if (user.value) {
    navigateTo('/dashboard');
  } else {
    navigateTo('/login');
  }
});

definePageMeta({
  title: 'Home',
});
</script>

<template>
  <div></div>
</template>
