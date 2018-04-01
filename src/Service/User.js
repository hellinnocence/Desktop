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
  }
}