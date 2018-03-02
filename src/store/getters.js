const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    imgSrc: state => 'http://imgs.cqzuxia.com/small_light/images/',
    roles: state => state.user.roles,
    visitedViews: state => state.tagsView.visitedViews,
    errorLogs: state => state.errorLog.logs,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
}

export default getters
