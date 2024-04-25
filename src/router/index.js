import { createRouter, createWebHistory } from 'vue-router'
import mainpage from '../views/mainpage.vue'
// import Vue from 'vue'
// import Router from 'vue-router'
// import memberLogin from '@/views/member-login.vue'
import kakaoLogin from '@/views/test.vue'
// Vue.use(Router)
// export default new Router({
//   mode: 'history',/k
//    routes: [
//   //   // {
//   //   //   path: '/kakaoLogin',
//   //   //   component: MemberLogin,
//   //   //   beforeEnter: (to, from, next) => {
//   //   //     if (to.query.code) {
//   //   //       to.params.code = to.query.code; // URL에서 코드를 params로 전달
//   //   //     }
//   //   //     next();
//   //   //   }
//   //   // }
//    ]
// })
const routes = [
  {
    path: '/',
    name: 'mainpage',
    component: mainpage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/kakaologin',
    name: 'kakaoLoginsetting',
    component: kakaoLogin
  },
  {
    path: '/golf-membership',
    name: 'golf-membership',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/golf-membership.vue')
  },
  {
    path: '/member-login',
    name: 'member-login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/member-login.vue')
  },
  {
    path: '/golfcourse',
    name: 'golfcourse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/golfcourse.vue')
  },
  {
    path: '/golf-feedback',
    name: 'golf-feedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/golf-feedback.vue')
  },
  {
    path: '/golf_reservation',
    name: 'golf_reservation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/golf_reservation.vue')
  },
  {
    path: '/golf-register',
    name: 'golf-register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/golf-register.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router