<template>
  <TableTemplate :data-callback="dataCallback" :columns="columns" :request-api="getOrderList">
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button
      type="primary"
      link
      icon="View"
      v-auth="['btn.User.update']"
      @click="openDrawer('编辑', scope.row)"
      >查看</el-button>
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getOrderList } from '@/api'
import TableTemplate from '@/components/TableTemplate/TableTemplate.vue'
import { ColumnProps } from '@/components/TableTemplate/types'
// const { getTableDataApi } = '@/mock/table.ts'
import { Order } from '@/api/order/types'

const handleClick = () => {
  console.log('click')
}
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  { prop: 'outTradeNo', label: '订单号' },
  { prop: 'totalAmount', label: '支付金额(¥)' },
  { prop: 'consignee', label: '收货人' },
  { prop: 'orderStatusName', label: '订单状态' },
  { prop: 'createTime', label: '创建时间', sortable: true, width: 110 },
  { prop: 'expireTime', label: '失效时间', sortable: true, width: 110 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 100 },
]
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<Order.ResOrderList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: '',
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}
</script>
