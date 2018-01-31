import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

//  常规路由
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: _import('dashboard/index')
        }]
    },
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

//  异步路由
export const asyncRouterMap = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        meta: { roles: ['admin'] }, // you can set roles in root nav
        children: [{
            path: 'index',
            component: _import('permission/index'),
            name: 'permission',
            meta: {
                title: 'permission',
                icon: 'example',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },

    {
        path: '/account',
        component: Layout,
        redirect: '/account/class',
        name: '学院管理',
        meta: { title: '学院管理', icon: 'school' },
        children: [
            {
                path: 'class',
                name: '学院班级',
                component: _import('account/class'),
                meta: { title: '学院班级', icon: 'class' }
            }, {
                path: 'class2',
                name: '学院班级2',
                component: _import('account/class'),
                meta: { title: '学院班级2', icon: 'class' }
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/course/album',
        name: '课程管理',
        meta: { title: '课程管理', icon: 'course' },
        children: [
            {
                path: 'album',
                name: '专辑管理',
                component: _import('course/album'),
                meta: { title: '专辑管理', icon: 'album' }
            },
            {
                path: 'package',
                name: '套餐管理',
                component: _import('course/package'),
                meta: { title: '套餐管理', icon: 'package' }
            },
            {
                path: 'coupon',
                name: '优惠券管理',
                component: _import('course/coupon'),
                meta: { title: '优惠券管理', icon: 'coupon' }
            },
            {
                path: 'sales',
                name: '销售账单历史',
                component: _import('course/sales'),
                meta: { title: '销售账单', icon: 'sales' }
            },
            {
                path: 'report',
                name: '销售账单报表',
                component: _import('course/report'),
                meta: { title: '销售报表', icon: 'report' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]