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
  }
}