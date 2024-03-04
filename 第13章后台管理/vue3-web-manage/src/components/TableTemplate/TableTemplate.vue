<template>
    <el-table 
      ref="tableRef" 
      v-bind="$attrs" 
      v-loading="loading" 
      :data="tableData" 
      :row-key="getRowKeys"
      border 
      @selection-change="selectionChange"
      >
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          v-if="item.type == 'selection' || item.type == 'index'"
        ></el-table-column>
        <!-- expend -->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          v-if="item.type == 'expend'"
          v-slot="scope"
        >
          <component :is="item.render" :row="scope.row" v-if="item.render"></component>
          <slot :name="item.type" :row="scope.row" v-else></slot>
        </el-table-column>
        <!-- other column -->
        <TableColumn :column="item" v-if="!item.type && item.prop">
          <template
            v-for="slot in Object.keys($slots)"
            :key="slot"
            #[slot]="scope"
          >
          <slot :name="slot" :row="scope.row"></slot>
        </template>
        </TableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"></slot>
      </template>
      <!-- nodata -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="./assets/images/notData.png" alt="noData" style="margin: 10px auto;"/>
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot>
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
        style="padding-top: 10px;"
      />
    </slot>
    <ColSetting v-if="toolButton" ref="colRef" v-model:colSetting="colSetting" />
</template>
  
<script lang="ts" setup>
import { ref, provide, watch } from 'vue';
import { useFullscreen } from '@vueuse/core';
import { useSelection } from './hooks-table/useSelection'
import { useTable } from './hooks-table/useTable'
import { ElTable, TableProps } from 'element-plus'
import type { ColumnProps, BreakPoint } from './types'
import TableColumn from './components/TableColumn.vue'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'

/**
 * @description: props类型定义
 * @param columns       - 列配置项
 * @param requestApi    - 请求表格数据的api ==> 必传
 * @param dataCallback  - 返回数据的回调函数，可以对数据进行处理 ==> 非必传
 * @param title         - 表格标题，目前只在打印的时候用到 ==> 非必传
 * @param pagination    - 是否需要分页组件 ==> 非必传（默认为true）
 * @param initParam     - 初始化请求参数 ==> 非必传（默认为{}）
 * @param border        - 是否带有纵向边框 ==> 非必传（默认为true）
 * @param toolButton    - 是否显示表格功能按钮 ==> 非必传（默认为true）
 * @param selectId      - 当表格数据多选时，所指定的字段名 ==> 非必传（默认为 id）
 * @param searchCol     - 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
 * @param resetCallback      - 点击重置时候所额外执行的回调函数 ==> 非必传（默认为()=>{}）
 * 
 */
interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[]
  requestApi: (params:any) => Promise<any>
  dataCallback?: (data: any) => any
  title?: string
  pagination?: boolean
  initParam?: any
  border?: boolean
  toolButton?: boolean
  selectId?: string
  requestAuto?: boolean
  searchCol?: number | Record<BreakPoint, number>
  resetCallback?: () => void
}

const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  selectId: 'id',
  requestAuto: true,
  searchCol: () => ({xs: 1, sm: 2, md: 2, lg: 3, xl: 4}),
  resetCallback:() => ({})
})

const tableCard = ref()
// 表格元素
const tableRef = ref<InstanceType<typeof ElTable>>()

//表格全屏
const { isFullscreen, toggle } = useFullscreen(tableCard)

// 接受 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

  const handleClick = () => {
    console.log('click')
  }
  
  // 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  loading,
  search,
  reset: resetTable,
  getTableList,
  handleSizeChange,
  handleCurrentChange,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
)
const reset = () => {
  resetTable()
  props.resetCallback()
}
// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true })
// 监听页面 columns中的某项enum是否改变，重新设置enum数据 目前只针对select的数据
watch(
  () => props.columns,
  () => {
    props.columns.forEach((item) => {
      if (
        item.search &&
        item.search.el &&
        item.search.el === 'select' &&
        item.enum
      ) {
        // 重设数据
        setEnumMap(item)
        // 重重对应搜索数据
        item.prop && (searchParam.value[item.prop] = '')
      }
    })
  },
  { deep: true },
)

// 初始化请求
// onMounted(() => props.requestAuto && getTableList())
//* --------------------表格多选-----------------------

// 表格多选 Hooks
const {
  selectionChange,
  getRowKeys,
  selectedList,
  selectedListIds,
  isSelected,
} = useSelection(props.selectId)

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection()

// --------------------搜索-----------------------
// 是否显示搜索模块
const isShowSearch = ref(true)

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide('enumMap', enumMap)

const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return
  if (typeof col.enum !== 'function')
    return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 扁平化 columns
const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = [],
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isShow = col.isShow ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}
const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el)

// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref()
const colSetting = tableColumns.value!.filter((item) => {
  return (
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation'
  )
})
const openColSetting = () => colRef.value.openColSetting()

defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  enumMap,
  isSelected,
  selectedList,
  selectedListIds,
  reset,
  getTableList,
  clearSelection,
})
  </script>
<style lang="scss" scoped>
@import './style/index';
</style>