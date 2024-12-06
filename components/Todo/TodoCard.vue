<template>
  <OverlayBadge size="small" :severity="completed ? 'success' : 'danger'">
    <Card
      v-bind="$attrs"
      v-tooltip.top="{
        value: 'Click to Toggle Completion',
        showDelay: 1000,
      }"
      class="hover:!ring cursor-pointer"
      :class="{
        '!ring-2': showEditDialog,
        'ring-green-500/30': completed,
        'ring-red-500/30': !completed,
      }"
      @contextmenu="onOpenContextMenu"
      @click="onToggleCompletion"
    >
      <template #title>
        {{ task }}
      </template>
      <template #subtitle>
        <DeferredContent>
          <TodoUser :userId="props.todo.userId" />
        </DeferredContent>
      </template>
    </Card>
    <ContextMenu ref="menu" :model="items" />
    <Dialog
      v-model:visible="showEditDialog"
      header="Edit Task"
      :closable="false"
      position="top"
      pt:mask:class="backdrop-blur-sm"
      modal
    >
      <div>
        <Textarea
          id="task"
          v-model="task"
          rows="5"
          cols="30"
          style="resize: none"
        />
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="onCancelEditTodo"
        />
        <Button type="button" label="Update" @click="onEditTodo" />
      </div>
    </Dialog>
  </OverlayBadge>
</template>

<script setup lang="ts">
import type { ContextMenuMethods } from "primevue";
import type { MenuItem } from "primevue/menuitem";
import type { Todo, User } from "~/models/dummy";

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();
const toast = useToast();

const task = ref<Todo["title"]>(props.todo.title);
const completed = ref<Todo["completed"]>(props.todo.completed);
const showEditDialog = ref(false);

const menu = ref<ContextMenuMethods>();
function onOpenContextMenu(event: MouseEvent) {
  menu.value?.show(event);
}

function onEditTodo() {
  toast.add({
    severity: "success",
    summary: "Edit Task",
    detail: `Task Updated Successfully`,
    life: 3000,
  });
  showEditDialog.value = false;
}

function onCancelEditTodo() {
  toast.add({
    severity: "warn",
    summary: "Edit Cancelled",
    detail: `Task Reset`,
    life: 3000,
  });
  task.value = props.todo.title;
  showEditDialog.value = false;
}

function onToggleCompletion() {
  completed.value = !completed.value;
  toast.add({
    severity: completed.value ? "success" : "warn",
    summary: "Task Completion",
    detail: `Task updated to: ${completed.value ? "Completed" : "Incomplete"}`,
    life: 3000,
  });
}

function openEditTodo() {
  task.value = props.todo.title;
  showEditDialog.value = true;
}

function deleteTodo() {
  toast.add({
    severity: "error",
    summary: "Delete Task",
    detail: `Task Deleted`,
    life: 3000,
  });
  // TODO: Add delete logic (confirm and emit event to parent)
}

const items = ref<MenuItem[]>([
  { label: "Edit Task", icon: "pi pi-pencil", command: openEditTodo },
  { separator: true },
  { label: "Delete Task", icon: "pi pi-trash", command: deleteTodo },
]);
</script>
