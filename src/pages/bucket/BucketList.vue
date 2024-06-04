<template>
  <div class="row">
    <div class="col p-3">
      <router-link class="btn btn-primary" to="/buckets/add">
        버킷리스트 추가
      </router-link>
      <button class="btn btn-primary ms-1" @click="fetchBucketList">
        새로 고침
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <Item v-for="item in bucketList" :key="item.id" :todoItem="item" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import Item from '@/components/todo/Item.vue';

const bucketList = inject('bucketList');
const { fetchBucketList } = inject('actions');
</script>
