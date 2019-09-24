import Vue from 'vue'
import Router from 'vue-router'

// 解决vue router 报错： Uncaught (in promise) 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home/Home')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/my/My')
    },
    {
      path: '/assets',
      name: 'assets',
      component: () => import('./views/home/Assets')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login')
    },
    {
      path: '/verifylogin',
      name: 'verifylogin',
      component: () => import('./views/login/VerifyLogin')
    },
    {
      path: '/sendcode',
      name: 'sendcode',
      component: () => import('./views/login/SendCode')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/login/Register')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/my/Order'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addaddress',
      name: 'addaddress',
      component: () => import('./views/my/AddAddress')
    },
    {
      path: '/productassets',
      name: 'productassets',
      component: () => import('./views/home/ProductAssets'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/placeorder',
      name: 'placeorder',
      component: () => import('./views/home/PlaceOrder')
    },
    {
      path: '/sendgoods',
      name: 'sendgoods',
      component: () => import('./views/home/SendGoods')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./views/my/Card'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: () => import('./views/my/AddCard')
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: () => import('./views/home/OrderDetail')
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: () => import('./views/my/Suggest')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/home/Search')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('./views/my/Address'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/login/Privacy'),
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});
import { Toast } from 'vant';
//  路由权限控制 进入my组件时候 需要登录状态
router.beforeEach((to,from,next) => {
  // console.log(to.meta.requiresAuth)
  if(to.meta.requiresAuth){
    // 如果不为空 说明已经登录 直接放行
   // console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")!= null){
      next();
    }else{
      Toast({
        message: "请先登录!",
        duration: 1000
      });
      next({path: "/login"});
    }
  }else{
    next();
  }
   });

export default router;
