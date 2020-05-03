// 这个文件会获取当前文件夹所有的 .router.js结尾的文件 把路由全总结到routers中 然后外面的router应用
const routers = []

const requireRouters = require.context('.', false, /\.router\.js/)
requireRouters.keys().forEach(route =>{
    //console.log(route) // 会打印出模块的名字  ./home.router.js
    //console.log(requireRouters(route))  // {default:[{path:xxx, name:''', component:xxx}]}
    routers.push(...requireRouters(route).default)
})
// console.log(routers)
export default routers