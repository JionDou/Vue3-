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
import { HOME_URL, LOGIN_URL } from '@/config/config'

const LAYOUT = () => import('@/components/layouts/Layout.vue')

/**
 * @description 静态路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_URL,
    name: 'login',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/',
    name: 'LAYOUT',
    component: LAYOUT,
    redirect: HOME_URL,
    meta: {
      title: '工作台',
      icon: 'DataBoard',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          affix: true,
        },
      },
      {
        path: '/screen',
        name: 'Screen',
        component: () => import('@/views/ScreenView.vue'),
        meta: {
          title: '图表',
          icon: 'DataAnalysis',
          affix: true,
        },
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          title: '订单',
          icon: 'List',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/data-screen',
    name: 'DataScreen',
    component: () => import('@/views/data-screen/index.vue'),
    meta: {
      icon: 'DataLine',
      title: '数据大屏',
    },
  },
  // 此路由防止控制台出现No match found for location with path的警告
  {
    path: '/:catchAll(.*)',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error/404.vue'), 
  },
]

/**
 * @description 路由未找到
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '404',
}
