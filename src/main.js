// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import Keycloak from 'keycloak-js'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

const initOptions = {
  url: '/',
  realm: 'demo',
  clientId: 'vue-demo',
  onLoad:'login-required'
}
const keycloak = Keycloak(initOptions);

// keycloak.init({ onLoad: initOptions.onLoad, promiseType: 'native' }).then((authenticated) =>{
//   console.log('keycloak',authenticated)
//   if(!authenticated) {
//     window.location.reload();
//   } else {
//     Vue.prototype.$keycloak = keycloak
//     console.log('Authenticated')
//   }

//   new Vue({
//     render: h => h(App),
//   }).$mount('#app')

//   setInterval(() =>{
//     keycloak.updateToken(70).then((refreshed)=>{
//       if (refreshed) {
//         console.log('Token refreshed');
//       } else {
//         console.log('Token not refreshed, valid for '
//             + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//       }
//     }).catch(error => {
//       console.log('Failed to refresh token', error)
//     })
//   }, 60000)

// }).catch(error => {
//   console.log('Authenticated Failed', error)
// })


Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
