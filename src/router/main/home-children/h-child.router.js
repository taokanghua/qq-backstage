const HomeRouters = [
    {   
        path:'overview',
        name:'welcome',
        component: () => import('@/views/home-children/welcome')
    },
    {
        path:'accountManager',
        name:'accountManager',
        component: () => import('@/views/home-children/accountManager')
    },
    {
        path: 'adminAccountManager',
        name:'adminAccountMaanager',
        component: () => import('@/views/home-children/adminAccManager')
    },
    {
        path:'dynamicManager',
        name:'dynamicManager',
        component: () => import('@/views/home-children/dynamicManager')
    },
    {
        path:'sysSetting',
        name:'sysSetting',
        component: () => import('@/views/home-children/sysSetting')
    },
    {
        path:'mapChart',
        name:'mapChart',
        component: () => import('@/views/home-children/mapChart')
    }
]
export default HomeRouters