const router = [
    {
        path:'/', 
        name:'login',
        component: () => import('@/views/login.vue')
    }
]

export default router