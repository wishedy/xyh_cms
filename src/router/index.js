import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: false                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/layout/home')
  },
  {
    path: '/usr',
    component: Layout,
    redirect: '/usr/manage',
    meta: {
      title: '??????',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/member/memberList/index'),
        name: 'Manage',
        meta: { title: '????????????', icon: 'el-icon-user', affix: false }
      },
      {
        path: 'demand',
        component: () => import('@/views/member/memberDemand/index'),
        name: 'Demand',
        meta: { title: '????????????', icon: 'el-icon-s-shop', affix: false }
      },
      {
        path: 'order',
        component: () => import('@/views/member/memberOrder/index'),
        name: 'Order',
        meta: { title: '????????????', icon: 'el-icon-s-goods', affix: false }
      }, {
        path: 'invoice',
        component: () => import('@/views/member/memberInvoice/index'),
        name: 'Invoice',
        meta: { title: '????????????', icon: 'el-icon-s-ticket', affix: false }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/article',
    meta: {
      title: '??????',
      icon: 'el-icon-video-camera-solid'
    },
    children: [
      {
        path: 'demandType',
        component: () => import('@/views/resource/demand/index'),
        name: 'DemandType',
        meta: { title: '????????????', icon: 'el-icon-menu', affix: false }
      },
      {
        path: 'article',
        component: () => import('@/views/resource/article/index'),
        name: 'Article',
        meta: { title: '????????????', icon: 'el-icon-tickets', affix: false }
      },
      {
        path: 'video',
        component: () => import('@/views/resource/video/index'),
        name: 'Video',
        meta: { title: '????????????', icon: 'el-icon-video-camera', affix: false }
      }
    ]
  },
  {
    path: '/side',
    component: Layout,
    redirect: '/side/banner',
    meta: {
      title: '????????????',
      icon: 'el-icon-platform-eleme'
    },
    children: [
      {
        path: 'banner',
        component: () => import('@/views/side/banner/index'),
        name: 'Banner',
        meta: { title: 'Banner?????????', icon: 'el-icon-picture', affix: false }
      },
      {
        path: 'sideHome',
        name: 'SideHome',
        component: () => import('@/views/homeManage/index'),
        meta: { title: '??????', icon: 'el-icon-s-home', affix: false },
        redirect: '/side/banner',
        children: [
          {
            path: 'homeColumn',
            component: () => import('@/views/homeManage/demand/index'),
            name: 'HomeColumn',
            meta: { title: '??????????????????', icon: 'el-icon-files', affix: false }
          },
          {
            path: 'homeList',
            component: () => import('@/views/homeManage/product/index'),
            name: 'HomeList',
            meta: { title: '??????????????????', icon: 'el-icon-present', affix: false }
          }
        ]
      },
      {
        path: 'servicePlatform',
        component: () => import('@/views/side/service/index'),
        name: 'ServicePlatform',
        meta: { title: '??????????????????', icon: 'el-icon-service', affix: false }
      },
      {
        path: 'classroom',
        name: 'Classroom',
        component: () => import('@/views/side/classRoom/index'),
        meta: { title: '????????????', icon: 'el-icon-school', affix: false },
        redirect: '/classroom/column',
        children: [
          {
            path: 'classroomColumn',
            component: () => import('@/views/side/classRoom/classType/index'),
            name: 'ClassroomColumn',
            meta: { title: '????????????', icon: 'el-icon-coin', affix: false }
          },
          {
            path: 'classroomList',
            component: () => import('@/views/side/classRoom/classResource/index'),
            name: 'ClassroomList',
            meta: { title: '????????????', icon: 'el-icon-s-data', affix: false }
          }
        ]
      },
      {
        path: 'feature',
        component: () => import('@/views/side/feature/index'),
        name: 'Feature',
        meta: { title: '????????????', icon: 'el-icon-share', affix: false }
      },
      {
        path: 'cooperation',
        component: () => import('@/views/side/global/index'),
        name: 'Cooperation',
        meta: { title: '????????????', icon: 'el-icon-s-help', affix: false }
      },
      {
        path: 'service',
        component: () => import('@/views/side/miniapp/index'),
        name: 'Service',
        meta: { title: '?????????????????????', icon: 'el-icon-apple', affix: false }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/side/qr/index'),
        name: 'Qrcode',
        meta: { title: '???????????????', icon: 'el-icon-s-grid', affix: false }
      },
      {
        path: 'about',
        component: () => import('@/views/side/about/index'),
        name: 'About',
        meta: { title: '????????????', icon: 'el-icon-s-opportunity', affix: false }
      },
      {
        path: 'zoology',
        component: () => import('@/views/side/about/index'),
        name: 'Zoology',
        meta: { title: '????????????', icon: 'el-icon-bangzhu', affix: false }
      },
      {
        path: 'client',
        component: () => import('@/views/side/about/index'),
        name: 'Client',
        meta: { title: '????????????', icon: 'el-icon-hot-water', affix: false }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/administrator',
    meta: {
      title: '??????',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'administrator',
        component: () => import('@/views/adminor/adminorList/index'),
        name: 'Administrator',
        meta: { title: '???????????????', icon: 'el-icon-office-building', affix: false }
      },
      {
        path: 'password',
        component: () => import('@/views/adminor/adminorPassword/index'),
        name: 'Password',
        meta: { title: '????????????', icon: 'el-icon-lock', affix: false }
      },
      {
        path: 'information',
        component: () => import('@/views/journal/index'),
        name: 'Information',
        meta: { title: '????????????', icon: 'el-icon-message', affix: false }
      }
    ]
  }
]

export const asyncRoutes = []
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
