import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// import api from "./request/api"
// Vue.prototype.api = api;
import LGDesign from "Packages/index"; //自定义组件
Vue.use(LGDesign);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
