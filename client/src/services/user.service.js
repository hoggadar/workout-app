import { ax } from '../api.js'

const USERS = '/users'

class UserService {
  async getProfile() {
    return ax.get(`${USERS}/profile`)
  }
}

export default new UserService()
