import axios from 'axios'

export default {
  GetEdit(id) {
    return axios.get('/Permit/Edit', {
      params: {id: id}
    })
  },
  PostEdit(data) {
    return axios.post('/Permit/Edit', data)
  },
  Remove(id) {
    return axios.post('/Permit/Remove?id=' + encodeURIComponent(id))
  },
  Page(data){
    return axios.post('/Permit/Page', data)
  },
  Options(){
    return axios.get('/Permit/Options')
  },
  GetChooseUsers(id){
    return axios.get('/Permit/ChooseUsers', {
      params: {id: id}
    })
  },
  PostChooseUsers(id, users) {
    return axios.post('/Permit/ChooseUsers', { ID: id, Users: users })
  },
  GetChooseRoles(id){
    return axios.get('/Permit/ChooseRoles', {
      params: {id: id}
    })
  },
  PostChooseRoles(id, roles) {
    return axios.post('/Permit/ChooseRoles', { ID: id, Roles: roles })
  }
}