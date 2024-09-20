import axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN } from './app.constants.js'

const API_URL = 'http://localhost:3000/api'

export const ax = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : ''
  }
})
