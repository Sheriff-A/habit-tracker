<template>
  <div>
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const APP_NAME = "PRIMEVUE";
useHead({
  titleTemplate(title) {
    return title ? `${title} - ${APP_NAME}` : APP_NAME;
  },
});
</script>
