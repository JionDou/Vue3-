<template>
    <div>
          count:{{ count }}
          <button @click="addCount">count++</button>
    </div>
</template>
​
<script setup lang="ts">
import { ref } from 'vue';
import { useCounterStore } from '@/store/modules/counter';
// 导入store
const store = useCounterStore()
// 将count赋值
const count = ref(store.count)
// count增加方法
function addCount() {
    count.value++
    store.increment()
}
</script>
​
<style scoped>

</style>