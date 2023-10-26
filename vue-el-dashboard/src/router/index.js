import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'
import Login from '@/components/login/login.vue';
import Home from '@/components/Home/indexHome.vue';

Vue.use(Router)

var routes = [
  {
    path: '/',
    component: Home,
    children:[]
  },
  {
    path:'/login',
    component: Login,
  }
]

menus.forEach((item) => {
  item.sub.forEach((sub) => {
    routes[0].children.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`),
    })
  })
})

export default new Router({
  routes
})
