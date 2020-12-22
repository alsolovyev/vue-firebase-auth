import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './routes'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '',
  linkExactActiveClass: 'is-active',
  routes
})

router.beforeEach((to, from, next) => {
  const isRequiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isRequiresAnon = to.matched.some(route => route.meta.requiresAnon)
  const isAuth = store.getters['user/isAuth']

  /** Protecte secret views */
  if (isRequiresAuth && !isAuth) return next({ name: 'Signin', query: { redirect: to.fullPath } })

  /** Hide auth views while user is logged in */
  if (isAuth && isRequiresAnon) return next({ name: 'Home' })

  /** Avoide redundant navigation */

  return next()
})


export default router
