<template>
    <section class="app-mian-height">
        <router-link v-solt="{ Component, route }" v-if="show">
            <transition appear name="fade-transform" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </router-link>
    </section>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/modules/settings'

const settingStore = useSettingsStore()
const show = ref(true)
watch(
    () => settingStore.refresh,
    () => {
        isShow.value = false
        nextTick(() => {
            isShow.value = true
        })
    },
) 
</script>

<style scoped lang="scss">
.app-mian-height {
  min-height: $base-app-main-height;

  // padding: 20px;
  background-color: inherit;
}
</style>