import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/gloable.css"; // 引入全域css

import request from "@/utils/request";
Vue.prototype.axios = request;

import axios from "axios"; //導入axios
import store from "./store";


axios.defaults.baseURL = "/api";
axios.defaults.withCredentials=true
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "mini" });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

