import child from './home-children/index.js'

let children = child
// console.log(children)
const homeRouters = [
    {
        path:'/home',
        redirect:'/home/overview',
        name:'home',
        component: ()=>import('@/views/home.vue'),
        children
    }
]

export default homeRouters