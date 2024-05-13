import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/basket', component: () => import('@/pages/BasketPage.vue') }
]

const router = createRouter({
    history: createWebHistory('/bookshop/'),
    routes
})

export default router
