import axios from 'axios'

export default {
  GetEdit(id) {
    return axios.get('/Role/Edit', {
      params: {id: id}
    })
  },
  PostEdit(data) {
    return axios.post('/Role/Edit', data)
  },
  Remove(id) {
    return axios.post('/Role/Remove?id=' + encodeURIComponent(id))
  },
  Page(data){
    return axios.post('/Role/Page', data)
  },
  Options(){
    return axios.get('/Role/Options')
  },
  GetChooseUsers(id){
    return axios.get('/Role/ChooseUsers', {
      params: {id: id}
    })
  },
  PostChooseUsers(id, users) {
    return axios.post('/Role/ChooseUsers', { ID: id, Users: users })
  },
  GetChoosePermits(id){
    return axios.get('/Role/ChoosePermits', {
      params: {id: id}
    })
  },
  PostChoosePermits(id, permits) {
    return axios.post('/Role/ChoosePermits', { ID: id, Permits: permits })
  }
}