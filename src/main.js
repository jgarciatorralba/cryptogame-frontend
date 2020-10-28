import Vue from "vue";
import VueRouter from "vue-router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import Home from "./components/Home.vue";
import Ranking from "./components/Ranking.vue";
import Transactions from "./components/Transactions.vue";
import Profile from "./components/Profile.vue";
import Wallet from "./components/Wallet.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import Reset from "./components/auth/Reset.vue";
import Details from "./components/Details.vue";
import NotFound from "./components/NotFound.vue";
import Admin from "./components/Admin.vue";

import Axios from "axios";
Vue.prototype.$http = Axios;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(require("vue-moment"));

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/details/:coinId",
    name: "Details",
    component: Details,
    props: true
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    meta: {
      guest: true
    }
  },
  // 404 Page
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  },
  // Admin page
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  }
];

const router = new VueRouter({ routes: routes, mode: "history" });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("access_token") == null) {
      next({
        name: "Login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.role == 1) {
          next();
        } else {
          next({
            name: "Home",
            params: { error: "You have no authorization to see that resource" }
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("access_token") == null) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
