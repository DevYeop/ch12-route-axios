<template>
  <div class="row">
    <div class="col p-3">
      <h2>할일 추가</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlFor="todo">버킷리스트 :</label>
        <input
          type="text"
          class="form-control"
          id="todo"
          v-model="bucketItem.todo"
        />
      </div>
      <div class="form-group">
        <label htmlFor="desc">설명 :</label>
        <textarea
          class="form-control"
          rows="3"
          id="desc"
          v-model="bucketItem.desc"
        ></textarea>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="addBucketHandler"
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

const router = useRouter();
const { addBucket } = inject('actions');
const bucketItem = reactive({ todo: '', desc: '' });

const addBucketHandler = () => {
  let { todo } = bucketItem;
  if (!todo || todo.trim() === '') {
    alert('제목은 반드시 입력해야 합니다');
    return;
  }
  addBucket({ ...bucketItem }, () => {
    // 일반적인 용례
    router.push('/todos');
  });
};
</script>
