import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index'),
  },
  {
    path: '/project/:name',
    name: 'Project',
    component: () => import('@/views/Project'),
  },
  {
    path: '/project',
    name: 'Project List',
    component: () => import('@/views/Projects'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About'),
  },
  { path: '/projects', redirect: '/project' },
  { path: '/work/:name', redirect: '/project/:name' }, // 重新導向舊作品路由
  { path: '/404.html', redirect: '/' },
  { path: '*', redirect: '/' }, // 找不到路由時導向至首頁
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => savedPosition ?? { x: 0, y: 0 },
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false }).start()
  next()
})

router.afterEach(() => setTimeout(NProgress.done, 300))

export default router
