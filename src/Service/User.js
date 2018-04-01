import axios from 'axios'

export default {
  PostEdit(data) {
    return axios.post('/User/Edit', data)
  },
  Page(data){
    return axios.post('/User/Page', data)
  }
}