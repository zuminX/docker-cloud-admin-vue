import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import { getUrl } from '@/utils/coreUtils'

Vue.use(VueRouter)

const url = getUrl()

// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/dashboard/resources',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

// 异步挂载的路由
export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '概览',
      icon: 'dashboard',
      role: ['ADMIN']
    },
    children: [
      {
        path: 'resources',
        name: 'ResourcesDashboard',
        component: () => import('@/views/dashboard/resources/index'),
        meta: {
          title: 'Docker资源',
          icon: 'dashboard'
        }
      },
      {
        path: 'statistics',
        name: 'StatisticsDashboard',
        component: () => import('@/views/dashboard/statistics/index'),
        meta: {
          title: '数据统计',
          icon: 'dashboard'
        }
      }]
  },
  {
    path: '/info',
    component: Layout,
    meta: {
      title: '信息列表',
      icon: 'table',
      role: ['ADMIN']
    },
    children: [
      {
        path: 'user-table',
        component: () => import('@/views/info-table/user-table/index'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'application-table',
        component: () => import('@/views/info-table/application-table/index'),
        meta: {
          title: '应用列表'
        }
      },
      {
        path: 'image-table',
        component: () => import('@/views/info-table/image-table/index'),
        meta: {
          title: '镜像列表'
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: `${url}/home`,
        meta: {
          title: '用户端首页',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const originalPush = VueRouter.prototype.push
/**
 * 解决重定向时报错
 *
 * @param location
 * @param onResolve
 * @param onReject
 * @returns {Promise<Route | *>|Promise<Route>|void}
 */
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  return onResolve || onReject ? originalPush.call(this, location, onResolve, onReject) : originalPush.call(this, location).catch(
    err => err)
}
