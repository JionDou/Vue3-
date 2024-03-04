<template>
    <div class="list-container" ref="listContainer">
      <div
        class="list-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ backgroundColor: item.background }"
      >
        {{ index }}
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </template>
  <script>
  import { reactive, onMounted } from 'vue'
  import { throttle } from 'lodash'
  
  export default {
    name: 'ListVue',
    setup () {
      const state = reactive({
        list: [{ background: 'rgb(233,32,38)' }],
        loading: false,
        page: 0, // 当前页数，从0开始
        limit: 10, // 每页渲染的条数
        total: 50, // 总共要渲染的条数
      })
  
      const getList = (num) => {
        // 模拟异步请求
        return new Promise((resolve) => {
          setTimeout(() => {
            const colors = Array.from({ length: num }, () =>
              getRandomColor()
            )
            const newList = colors.map((color) => ({ background: color }))
            resolve(newList)
          }, Math.random() * 5000)
        })
      }
  
      const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
      }
  
      const handleScroll = throttle(() => {
        const listContainer = state.$refs.listContainer
        console.log(listContainer)
        if (
          listContainer.scrollTop + listContainer.clientHeight >=
          listContainer.scrollHeight / 2 &&
          state.page * state.limit < state.total
        ) {
          state.loading = true
          getList(state.limit).then((newList) => {
            state.list = [...state.list, ...newList]
            state.page++
            state.loading = false
          })
        }
      }, 1000)
  
      onMounted(() => {
        // 初始化时获取数据并渲染
        getList(state.limit).then((newList) => {
          state.list = newList
          state.page++
        })
  
        // 监听滚动条事件
        const listContainer = state.$refs.listContainer
        listContainer.addEventListener('scroll', handleScroll)
      })
  
      return { state }
    },
  }
  </script>
  <style>
  
  .list-container {
    height: 100vh;
    overflow-y: scroll;
  }
  
  .list-item {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
  }
  
  .loading {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: lightgray;
  }
  </style>
  