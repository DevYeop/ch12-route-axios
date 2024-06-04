<template>
  <div class="row">
    <div class="col p-3">
      <h2>할일 수정</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlFor="todo">할일:</label>
        <input
          type="text"
          class="form-control"
          id="todo"
          v-model="todoItem.todo"
        />
      </div>
      <div class="form-group">
        <label htmlFor="desc">설명:</label>
        <textarea
          class="form-control"
          rows="3"
          id="desc"
          v-model="todoItem.desc"
        ></textarea>
      </div>
      <div class="form-group">
        <label htmlFor="done">완료여부 : </label>&nbsp;
        <input type="checkbox" v-model="todoItem.done" />
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="updateTodoHandler"
        >
          수 정
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
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(); // push() 등 라우터를 조직하기 위해 쓴다 (라우터는 라우팅을 시키는 주체다)
const currentRoute = useRoute(); // 현재 라우팅된 곳의 정보를 활용할 때 쓴다
console.log('currentRoute', currentRoute);
console.log('currentRoute', currentRoute.path);
console.log('currentRoute', currentRoute.params);
console.log('currentRoute', currentRoute.query);

const todoList = inject('todoList');
const { updateTodo } = inject('actions');

const matchedTodoItem = todoList.value.find(
  (item) => item.id === currentRoute.params.id
  // router/indexjs에서 { path: '/todos/edit/:id', component: EditTodo }, 로 설정해둿기 때문에, id라는 변수명으로 데이터를 받아먹을 수 있었던 것이다.
);

if (!matchedTodoItem) {
  router.push('/todos');
}

const todoItem = reactive({ ...matchedTodoItem });

const updateTodoHandler = () => {
  let { todo } = todoItem;
  if (!todo || todo.trim() === '') {
    alert('할일은 반드시 입력해야 합니다');
    return;
  }
  updateTodo({ ...todoItem }, () => {
    router.push('/todos');
  });
};
</script>

<style scoped></style>
