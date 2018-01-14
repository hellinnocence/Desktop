import axios from 'axios'

export default {
  Edit(data) {
    return axios.post('/Environment/User/Edit', data)
  },
  Query(data){
    return axios.post('/Environment/User/Query', data)
  }
}