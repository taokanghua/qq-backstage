let ENV = {
    login: '/adminloginin',
    allusers: '/allusers',
    findById: '/checkuser/', // 完整路径/checkuser/:id
    updateuserinfo: '/updatedata',
    deleteuser: '/deleteuser/',  //完整  /deleteuser/:id   这个没用了用下面的那个了
    getpagination:'/getpagination', //获取分页
    getDynamic: '/getdynamic',
    ordinaryDelete: '/deletedynamic', // 按uniq来假删除
    adminlist: '/adminlist',
    admininfo: '/getadmininfo/',
    editadmin:'/updateadmininfo',
    changestatus:'/changestatus',
    addadmin:'/addadmin',
    getNotify: '/getsysnotify',
}

export default ENV