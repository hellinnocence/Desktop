import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/Views/Admin'
import Login from '@/Views/Login'
import UserList from '@/Views/User/List'
import UserEdit from '@/Views/User/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/', 
      name: 'Admin', 
      component: Admin,
      children: [
        { path: '/User/List', name: 'UserList', component: UserList },
        { path: '/User/Edit', name: 'UserEdit',  component: UserEdit },
        { path: '/User/Edit/:id', name: 'UserEdit', component: UserEdit }
      ]
    },
    { path: '/Login', name: 'Login', component: Login }
  ]
})
