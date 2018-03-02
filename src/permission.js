import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

//  路由权限验证
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (store.getters.roles.length === 0) {
                const roles = ["teacher"]
                //store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                //    console.log(to.path)
                //    router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                //})
                // console.log(store.getters.imgSrc)
                store.dispatch('GetInfo').then(res => { // 拉取user_info
                    if (res.info.isteacher) {
                        next()
                    } else {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error('您不是老师，无法登录老师系统')
                            next({path: '/login'})
                        })
                    }
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('验证失败,请重新登录')
                        next({path: '/login'})
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
