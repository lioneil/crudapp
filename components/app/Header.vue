<script setup lang="ts">
import Container from '~/components/app/Container.vue';
import UserMenu from '~/components/app/UserMenu.vue';
</script>

<template>
  <header class="p-4 shadow-none">
    <Container class="justify-end">
      <SidebarToggle />
      <section class="flex flex-col items-end">
        <LazyWidgetsClock class="mr-2 text-xs mb-1" />
        <UserMenu />
      </section>
    </Container>
  </header>
</template>
