import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// import api from "./request/api"
// Vue.prototype.api = api;
import gSelect from "../packages/index";

Vue.use(gSelect);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
