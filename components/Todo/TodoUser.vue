<template>
  <div>
    <span v-if="status === 'pending'"> Loading... </span>
    <span v-if="status === 'error'">
      {{ error }}
    </span>
    <template v-if="status === 'success' && data">
      <span
        class="hover:underline hover:text-blue-500"
        @click.stop="openPopover"
      >
        {{ data.name }} ({{ data.username }})
      </span>
      <Popover ref="popover">
        <div class="w-[20rem]">
          <h3>{{ data.name }}</h3>
          <p class="secondary-text">{{ data.email }}</p>
          <p class="secondary-text">{{ data.phone }}</p>
          <p class="secondary-text">{{ data.website }}</p>
          <Button class="mt-4" label="View User Details" @click="onViewUser" />
        </div>
      </Popover>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PopoverMethods } from "primevue";
import type { Todo, User } from "~/models/dummy";

interface Props {
  userId: Todo["userId"];
}

const props = defineProps<Props>();
const { data, error, status } = await useFetch<User>(
  `https://jsonplaceholder.typicode.com/users/${props.userId}`,
  {
    lazy: true,
  }
);

const popover = ref<PopoverMethods>();

function onViewUser() {
  if (!data.value) return;
  console.log("UserID:", data.value.id);
}

function openPopover(event: MouseEvent) {
  popover.value?.show(event);
}
</script>
