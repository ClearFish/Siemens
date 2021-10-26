import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
// import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import Keycloak from 'keycloak-js'
// import config from '@/config'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}
// const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   const token = getToken()
//   if (!token && to.name !== LOGIN_PAGE_NAME) {
//     // 未登录且要跳转的页面不是登录页
//     next({
//       name: LOGIN_PAGE_NAME // 跳转到登录页
//     })
//   } else if (!token && to.name === LOGIN_PAGE_NAME) {
//     // 未登陆且要跳转的页面是登录页
//     next() // 跳转
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     // 已登录且要跳转的页面是登录页
//     next({
//       name: homeName // 跳转到homeName页
//     })
//   } else {
//     if (store.state.user.hasGetInfo) {
//       turnTo(to, store.state.user.access, next)
//     } else {
//       store.dispatch('getUserInfo').then(user => {
//         // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//         turnTo(to, user.access, next)
//       }).catch(() => {
//         setToken('')
//         next({
//           name: '/'
//         })
//       })
//     }
//   }
// })
const initOptions = {
  // url: 'http://139.24.142.187:8080/auth',
  url:window.location.protocol+'//'+ window.location.host+':'+window.location.port+'/auth',
  realm: 'Sustainium',
  clientId: 'Sustainium-GUI',
  onLoad:'login-required'
}
router.beforeEach((to, from, next)=>{
  const token = localStorage.getItem("token");
  if(token) {
    next()
  }else{
    const keycloak = Keycloak(initOptions);
    keycloak.init({ onLoad: initOptions.onLoad, promiseType: 'native' }).then((authenticated) =>{
      console.log('keycloak',authenticated)
      if(!authenticated) {
        window.location.reload();
      } else {
        Vue.prototype.$keycloak = keycloak;
        localStorage.setItem('token',keycloak.token)
        next()
        console.log('Authenticated',keycloak.token)
      }
      // setInterval(() =>{
      //   keycloak.updateToken(70).then((refreshed)=>{
      //     if (refreshed) {
      //       console.log('Token refreshed');
      //       localStorage.setItem('token',keycloak.token)
      //     } else {
      //       console.log('Token not refreshed, valid for '
      //           + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      //     }
      //   }).catch(error => {
      //     console.log('Failed to refresh token', error)
      //   })
      // }, 60000)

    }).catch(error => {
      console.log('Authenticated Failed', error)
    })
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
