import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import * as echarts from "echarts";
import "@/assets/ii.css"
import store from "./store"
// import "./quanxian"

Vue.config.productionTip = process.env.NODE_ENV == 'production';
Vue.prototype.echarts = echarts

// 开发环境   fasle     生产环境   true
// npm i -S axios   npm i -S element-ui  npm -S pubsub-js

// console.log(process.env.NODE_ENV)

// let process.env.VUE_APP_BASE_API="aa"
// let name="aa"
// // name:1111    aa:1111 
// let p={
//   [name]:"1111",
//   age:name
//   // process.env.VUE_APP_BASE_API:'1111'
// }

// //   []

// console.log(p)

// console.log([name])
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
