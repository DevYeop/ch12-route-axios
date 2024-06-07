<template>
  <div class="row">
    <div class="col p-3">
      <h2>할일 추가</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlFor="todo">할일 :</label>
        <input
          type="text"
          class="form-control"
          id="todo"
          v-model="todoItem.todo"
        />
      </div>
      <div class="form-group">
        <label htmlFor="desc">설명 :</label>
        <textarea
          class="form-control"
          rows="3"
          id="desc"
          v-model="todoItem.desc"
        ></textarea>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="addTodoHandler"
        >
          추 가
        </button>
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="router.push('/todos')"
        >
          취 소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoListStore } from '@/stores/todoList.js';

const router = useRouter();

// const { addTodo } = inject('actions');
const { addTodo } = useTodoListStore();

const todoItem = reactive({ todo: '', desc: '' });

const addTodoHandler = () => {
  let { todo } = todoItem;
  if (!todo || todo.trim() === '') {
    alert('할일은 반드시 입력해야 합니다');
    return;
  }
  // addTodo({ ...todoItem }, () => { // 일반적인 용례
  //   router.push('/todos');
  // });

  addTodo(todoItem, () => {
    // 이래도 되는 이유는? >> 구조분해할당 덕분에 참조값이 아니라, 값이 복사되어 전달되기 때문
    router.push('/todos');
  });

  // addTodo({ todoItem }, () => { // 왜 안되는가? >> 객체안의 객체를 보내는 것이기 때문에, 구조분해할당 문법에 어긋나서 매개변수는 결국 undefined이 되어버림
  //   router.push('/todos');
  // });
};
</script>
