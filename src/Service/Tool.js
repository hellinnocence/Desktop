import axios from 'axios'

export default {
  GenerateID() {
    return axios.post('/Tool/GenerateID')
  }
}