import Cookies from 'js-cookie'
import { createContext, useState } from 'react'
import { TOKEN } from '../app.constants.js'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN))
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
