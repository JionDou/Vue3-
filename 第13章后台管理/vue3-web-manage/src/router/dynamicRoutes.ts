/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/Layouts.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 基础数据模块
  {
    path: '/user',
    component: Layout,
    redirect: '/user/normal/list',
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/user/normal/list',
        name: 'UserNormal',
        component: () => import('@/views/user/normal/index.vue'),
        meta: { title: '普通用户管理', icon: 'Grid' },
      },
      {
        path: '/user/normal/show/:id',
        component: () => import('@/views/user/normal/show.vue'),
        meta: {
          title: '普通用户管理详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
      },
    ],
  },
]
