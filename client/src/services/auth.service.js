import { ax } from '../api.js'
import Cookies from 'js-cookie'
import { TOKEN } from '../app.constants.js'

const AUTH = '/auth'

class AuthService {
  async main(email, password, type) {
    try {
      const { data } = await ax.post(`${AUTH}/${type}`, {
        email,
        password
      })
      if (data.token) {
        Cookies.set(TOKEN, data.token)
      }
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new AuthService()
