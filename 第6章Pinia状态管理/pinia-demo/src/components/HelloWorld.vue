<script setup lang="ts">
import { useTestStore } from '../stores/modules/test';
import { storeToRefs } from "pinia";


const testStore = useTestStore()
const { Helloworld, count} = storeToRefs(useTestStore())

const handleCommond = () => {
  testStore.count++
}


</script>

<template>
  <h1>{{ Helloworld }}</h1>
  <div><button @click="handleCommond">{{count}}</button></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
