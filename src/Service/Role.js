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
  }
}