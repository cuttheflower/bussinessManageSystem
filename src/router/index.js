import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/Users/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    redirect: '/welcome',
    name: 'Home',
    component: Home,
    children: [
      {path: '/welcome',name: 'Welcome',component: Welcome},
      {path: '/users', name: 'Users', component: Users}
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})
export default router
