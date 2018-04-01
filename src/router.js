import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/Views/User/List'
import UserEdit from '@/Views/User/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'UserList', component: UserList },
    { path: '/User/Edit', name: 'UserEdit', component: UserEdit },
    { path: '/User/Edit/:id', name: 'UserEdit', component: UserEdit }
  ]
})
