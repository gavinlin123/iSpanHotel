import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Manage.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Manage",
    component: () => import("../views/Manage.vue"),
    meta: { requiresAuth: true},
    children: [
      {
        path: "home",
        name: "主頁",
        component: () => import("../views/Home.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "employee",
        name: "員工管理",
        component: () => import("../views/Employee.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "member",
        name: "會員管理",
        component: () => import("../views/Member.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "order",
        name: "訂單管理",
        component: () => import("../views/Order.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "roomtype",
        name: "房型管理",
        component: () => import("../views/Roomtype.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "room",
        name: "房務管理",
        component: () => import("../views/Room.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "hotelNews",
        name: "最新消息與活動管理",
        component: () => import("../views/HotelNews.vue"),
        meta: { requiresAuth: true}
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守衛
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name); // 設置當前的路由名稱，為了在Header元件中去使用
  store.commit("setPath"); // 觸發store的資料更新
  next(); // 放行路由
});

export default router;
