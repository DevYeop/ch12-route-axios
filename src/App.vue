<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="states.isLoading" />
  </div>
</template>

<script setup>
import { reactive, provide, computed } from 'vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';

const BASE_URI = '/api/todos';
const BASE_URI_BUCKET = '/api/buckets';

const states = reactive({ todoList: [], isLoading: false });
const statesBucket = reactive({ bucketList: [], isLoading: false });

//TodoList 목록을 조회합니다.
const fetchTodoList = async () => {
  states.isLoading = true;
  try {
    const response = await axios.get(BASE_URI);
    if (response.statusText === 'OK') {
      states.todoList = response.data;
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

const fetchBucketList = async () => {
  statesBucket.isLoading = true;
  try {
    const response = await axios.get(BASE_URI_BUCKET);
    if (response.statusText === 'OK') {
      statesBucket.bucketList = response.data;
      console.log('statesBucket.bucketList', statesBucket.bucketList);
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  statesBucket.isLoading = false;
};

// 새로운 TodoItem을 추가합니다.
const addTodo = async ({ todo, desc }, successCallback) => {
  states.isLoading = true;
  try {
    const payload = { todo, desc };
    const response = await axios.post(BASE_URI, payload);
    if (response.statusText === 'Created') {
      states.todoList.push({
        id: response.data.id,
        todo,
        desc,
        done: false,
      });
      successCallback();
    } else {
      alert('Todo 추가 실패 : ' + response.data.message);
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  // 애니메이션을 보기위해서 일부러, 로딩 상태를 2초 동안 유지
  setTimeout(() => {
    states.isLoading = false;
  }, 1000);
};

const addBucket = async ({ todo, desc }, successCallback) => {
  states.isLoading = true;
  try {
    const payload = { todo, desc };
    const response = await axios.post(BASE_URI_BUCKET, payload);
    if (response.statusText === 'Created') {
      states.todoList.push({
        id: response.data.id,
        todo,
        desc,
        done: false,
      });
      successCallback();
    } else {
      alert('Todo 추가 실패 : ' + response.data.message);
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  setTimeout(() => {
    states.isLoading = false;
  }, 1000);
};

// 기존 TodoItem을 변경합니다.
const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
  states.isLoading = true;
  try {
    const payload = { todo, desc, done };
    const response = await axios.put(BASE_URI + `/${id}`, payload);
    console.log(response);
    if (response.statusText === 'OK') {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList[index] = { id, todo, desc, done };
      successCallback();
    } else {
      alert('Todo 변경 실패 : ' + response.data.message);
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

//기존 TodoItem을 삭제합니다.
const deleteTodo = async (id) => {
  const answear = confirm('ㄹㅇ?'); // calcel버튼이 누르면 false가 return됨
  if (!answear) {
    // !가 붙음으로써 false의 반대값 true가 되면서 조건문이 실행됨. 즉 유저가 calcel버튼을 누르면, 실행을 그만둠으로써(return) 삭제하려던 걸 취소함
    return;
  }

  states.isLoading = true;
  try {
    const response = await axios.delete(BASE_URI + `/${id}`);
    console.log(response);
    if (response.statusText === 'OK') {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList.splice(index, 1);
    } else {
      alert('Todo 삭제 실패 : ' + response.data.message);
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

//기존 TodoItem의 완료여부(done) 값을 토글합니다.
const toggleDone = async (id) => {
  try {
    let todo = states.todoList.find((todo) => todo.id === id);
    let payload = { ...todo, done: !todo.done }; // 기존의 객체모두 + 추가 속성을 넣어서 객체를 만들때 유용한 기법. 은근히 종종 쓰인다.
    const response = await axios.put(BASE_URI + `/${id}`, payload);
    if (response.status === 200) {
      todo.done = payload.done;
    } else {
      alert('Todo 완료 변경 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

provide(
  'todoList',
  computed(() => states.todoList)
);

provide(
  'bucketList',
  computed(() => statesBucket.bucketList)
);

provide('actions', {
  addTodo,
  deleteTodo,
  toggleDone,
  updateTodo,
  fetchTodoList,
  fetchBucketList,
  addBucket,
});

fetchTodoList();
fetchBucketList();
</script>
