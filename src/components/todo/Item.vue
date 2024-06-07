<template>
  <li
    :class="
      todoItem.done
        ? 'list-group-item list-group-item-success'
        : 'list-group-item'
    "
    @click="toggleDone(todoItem.id)"
    @mouseover="isHoverEdit = true"
    @mouseleave="isHoverEdit = false"
  >
    <span :class="todoItem.done ? 'todo-done pointer' : 'pointer'">
      {{ todoItem.todo }}
      {{ todoItem.done ? '(완료)' : '' }}
    </span>
    <span
      :class="
        isHoverEdit
          ? 'float-end badge bg-primary pointer m-1'
          : 'float-end badge bg-secondary pointer m-1'
      "
      @click.stop="router.push(`/todos/edit/${todoItem.id}`)"
      @mouseover="isHoverEdit = true"
      @mouseleave="isHoverDel = false"
      ><!-- 이때 전달되는 ${todoItem.id}는 reouter/index.js에서 명시해놨던데로 id로 들어간다   -->

      편집</span
    >
    <span
      :class="
        isHoverDel
          ? 'float-end badge bg-danger pointer m-1'
          : 'float-end badge bg-secondary pointer m-1'
      "
      @click.stop="deleteTodo(todoItem.id)"
      @mouseover="isHoverDel = true"
      @mouseleave="isHoverDel = false"
    >
      삭제</span
    >
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';

import { useTodoListStore } from '@/stores/todoList.js';

const todoListStore = useTodoListStore();

defineProps({
  todoItem: { Type: Object, required: true },
});

const router = useRouter();
// const { deleteTodo, toggleDone } = inject('actions');
const { deleteTodo, toggleDone } = todoListStore;

const isHoverDel = ref(false);
const isHoverEdit = ref(false);
</script>
