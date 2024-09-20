import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { TOKEN } from '../app.constants.js'
import { useAuth } from './useAuth.js'

export const useToken = () => {
  const { isAuth, setIsAuth } = useAuth()
  const { pathname } = useLocation()
  useEffect(() => {
    const token = Cookies.get(TOKEN)
    if (!token) {
      setIsAuth(false)
    }
  }, [pathname, isAuth])
}
