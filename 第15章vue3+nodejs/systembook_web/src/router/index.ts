import { createRouter, createWebHistory } from 'vue-router'

let list = [
    {
        name:"login",
        path:"/login",
        component: () => import("../views/LoginPage.vue")
    },
    {
        name:"home",
        path:"/",
        component: () => import("../views/HomePage.vue")
    },
    // {
    //     name:"admin",
    //     path:"/",
    //     component: () => import("../views/index/RootPage.vue")
    // },
    {
        path: '/',
        name: 'Test',
        component: () => import('@/components/Test.vue') // 注意这里要带上 文件后缀.vue
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes: list
})

export default router