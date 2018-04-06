import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/Views/Admin'
import Login from '@/Views/Login'
import UserList from '@/Views/User/List'
import UserEdit from '@/Views/User/Edit'
import RoleList from '@/Views/Role/List'
import RoleEdit from '@/Views/Role/Edit'
import PermitList from '@/Views/Permit/List'
import PermitEdit from '@/Views/Permit/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/', 
      name: 'Admin', 
      component: Admin,
      children: [
        { path: '/User/List', name: 'UserList', component: UserList },
        { path: '/User/Edit/:id?', name: 'UserEdit', component: UserEdit },
        { path: '/Role/List', name: 'RoleList', component: RoleList },
        { path: '/Role/Edit/:id?', name: 'RoleEdit', component: RoleEdit },
        { path: '/Permit/List', name: 'PermitList', component: PermitList },
        { path: '/Permit/Edit/:id?', name: 'PermitEdit', component: PermitEdit }
      ]
    },
    { path: '/Login', name: 'Login', component: Login }
  ]
})
