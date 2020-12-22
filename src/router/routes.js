import Home from '@/views/Home'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: 'signup' */ '@/views/Signup'),
    meta: {
      requiresAnon: true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: 'signin' */ '@/views/Signin'),
    meta: {
      requiresAnon: true
    }
  },
  {
    path: '/secret',
    name: 'Secret',
    component: () => import(/* webpackChunkName: 'secret' */ '@/views/Secret'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: 'notfound' */ '@/views/NotFound')
  },
  {
    path: '*',
    redirect: { name: 'NotFound' }
  }
]


export default routes
