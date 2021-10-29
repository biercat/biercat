import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/register/index.vue"   //"../views/register/"
import login from "../views/login/index.vue"
import Layout from "../components/Layout.vue"

import home from "../views/home/index.vue"
import teacher from "../views/teacher/index.vue"
import student from "../views/student/index.vue"

import { getUserInfo } from "@/api/login.js"
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    component: Register,
    name: "register"
  },
  {
    path: "/login",
    component: login,
    name: "login"
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: home,
        meta: { title: "首页" }
      },
    ]
  },
  {
    path: "/teacher",
    component: Layout,
    name: "teacher",
    children: [
      {
        path: "/",
        component: teacher,
        meta: { title: "教师管理" }
      },
    ]
  },
  {
    path: "/student",
    component: Layout,
    name: "student",
    children: [
      {
        path: "/",
        component: student,
        meta: { title: "学员管理" }
      },
    ]
  }
];

const router = new VueRouter({
  routes,
  // mode:"history"  //更改路由的  hash 
});


router.beforeEach((to, from, next) => {
  let tonken = store.state.user.token
  if (!tonken) {
    if (to.path == "/login") {
      next()
    } else if (to.path == "/register") {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (to.path == "/login") {
      next()
    } else if (to.path == "/register") {
      next()
    } else {
      let userinfo = store.state.user.user
      // console.log(userinfo);
      // if (userinfo) {
      //   next()
      // } else {
        store.dispatch("user/GetUser").then(res => {
          if (res.flag) {
            // console.log(userinfo,res);
            next()
          } else {
            next({ path: '/login' })
          }
        }).catch(err => {
          console.log(err);
        })
      // }
    }
  }

})


export default router;
