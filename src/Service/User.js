import axios from 'axios'

export default {
  GetEdit(id) {
    return axios.get('/User/Edit', {
      params: {id: id}
    })
  },
  PostEdit(data) {
    return axios.post('/User/Edit', data)
  },
  Remove(id) {
    return axios.post('/User/Remove?id=' + encodeURIComponent(id))
  },
  Page(data){
    return axios.post('/User/Page', data)
  },
  Login(data){
    return axios.post('/User/Login', data)
  },
  GetChooseRoles(id){
    return axios.get('/User/ChooseRoles', {
      params: {id: id}
    })
  },
  PostChooseRoles(id, roles) {
    return axios.post('/User/ChooseRoles', { ID: id, Roles: roles })
  }
}