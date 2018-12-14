import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Businesses from './views/Businesses.vue'
import Login from './views/Login.vue'
import RegisterPage from './views/RegisterPage'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/businesses',
      name: 'businesses',
      component: Businesses
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { path: '/login',
      component: Login },
    { path: '/register', component: RegisterPage },
    // otherwise redirect to home
    { path: '*', redirect: '/login' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('IDMoneyUser');

  if (authRequired && !loggedIn) {
    return next('/login');
  }


  next();
})