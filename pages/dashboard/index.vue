<template>
  <div>
    <h1>Dashboard</h1>
    <Divider />
    <div class="my-4">
      <h3>Todo List</h3>
      <p>Right Click/Long Press each item for more options</p>
    </div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-if="status === 'error'">{{ error }}</div>
    <div v-if="status === 'success'">
      <ul class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <li v-for="item in data" :key="item.id">
          <TodoCard class="h-full" :todo="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "~/models/dummy";

useHead({
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content: "Dashboard page",
    },
  ],
});

const { data, error, status } = await useFetch<Todo[]>(
  "https://jsonplaceholder.typicode.com/todos",
  {
    lazy: true,
  }
);
</script>
