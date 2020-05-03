let children = []

const requireRouters = require.context('.', false, /\.router\.js/)
requireRouters.keys().forEach(route=>{
    children.push(...requireRouters(route).default)
})
export default children