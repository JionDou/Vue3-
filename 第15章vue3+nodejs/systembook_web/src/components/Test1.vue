<script setup lang="ts">
import { ref, onMounted } from 'vue';
const searchVal = ref('')
const enterSearch = () => {

}
onMounted(async()=>{
  await load()
})
const load = () => {
  is
}
const openAdd = () => {

}
const handleEdit = () => {

}
const handleDelete = () => {

}
const tableData = ref([])
</script>

<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <el-input v-model="searchVal" placeholder="请输入要搜索的关键字" class="input-with-select"
          @keyup.enter="enterSearch"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="load">查询</el-button>
        <el-button type="primary" @click="openAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="BookName" label="名称" width="180" />
      <el-table-column prop="Author" label="作者" width="180" />
      <el-table-column prop="TypeName" label="类别" />
      <el-table-column prop="Remarks" label="备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
