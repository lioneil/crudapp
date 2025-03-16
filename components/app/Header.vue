<script lang="ts" setup>
import Container from '~/components/app/Container.vue';
import MainNav from '~/components/app/MainNav.vue';
import UserMenu from '~/components/app/UserMenu.vue';

const config = useRuntimeConfig();
</script>

<template>
  <header class="p-4 shadow-none">
    <Container class="justify-end">
      <section class="flex flex-col items-end">
        <LazyWidgetsClock class="mr-2 text-xs mb-1" />
        <UserMenu />
      </section>
    </Container>
  </header>
</template>
