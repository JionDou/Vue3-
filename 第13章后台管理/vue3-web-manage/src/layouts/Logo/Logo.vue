<template>
    <div class="logo-container flex-center">
        <a href="/">
            <img class="logo" alt="logo" src="/logo.png" />
            <h1 class="title" v-if="!collapse">商城后台管理</h1>
        </a>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/modules/settings';

const settingStore = useSettingsStore()
const collapse = computed(() => settingStore.collapse)

</script>
<style scoped lang="scss">
.logo-container {
  position: relative;
  display: flex;
  justify-content: center;

  // padding-left: 24px;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  background: transparent;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
}
</style>
