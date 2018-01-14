import Vue from 'vue'
import Router from 'vue-router'
import EnvironmentUserList from '@/Views/Environment/User/List'
import EnvironmentUserEdit from '@/Views/Environment/User/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'EnvironmentUserList', component: EnvironmentUserList },
    { path: '/Environment/User/Edit', name: 'EnvironmentUserEdit', component: EnvironmentUserEdit }
  ]
})
