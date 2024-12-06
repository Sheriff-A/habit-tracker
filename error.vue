<template>
  <div>
    <Card class="m-12">
      <template #title> Error: {{ error?.statusMessage }} </template>
      <template #subtitle> Code: {{ error?.statusCode }} </template>
      <template #content>
        <pre>{{ error?.data ?? {} }}</pre>
        <Button label="Return to Homepage" class="mt-4" @click="handleError" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>
