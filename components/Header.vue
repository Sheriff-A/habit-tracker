<template>
  <Menubar :model="items" class="!rounded-none !border-0">
    <template #start>
      <span> PRIMEVUE </span>
    </template>
    <template #end>
      <IconField>
        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
        <InputIcon class="pi pi-search" />
      </IconField>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
const items = [
  {
    label: "Home",
    items: [
      { label: "Dashboard", icon: "pi pi-home" },
      { label: "Documentation", icon: "pi pi-book" },
    ],
  },

  {
    label: "About",
    items: [
      { label: "Overview", icon: "pi pi-home" },
      { label: "References", icon: "pi pi-book" },
    ],
  },
  {
    label: "Helpers",
    separator: true,
  },
  { label: "Settings", icon: "pi pi-cog" },
];
</script>
