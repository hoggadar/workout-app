import styles from './Header.module.scss'
import Burger from '../burger/Burger.jsx'
import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { SlUser } from 'react-icons/sl'
import { useAuth } from '../../../hooks/useAuth.js'

function Header({ backLink = '/' }) {
  const { isAuth } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      {pathname !== '/' || (pathname !== '/auth' && !isAuth) ? (
        <button
          onClick={() => {
            navigate(isAuth ? backLink : '/auth')
          }}
        >
          <IoMdArrowBack fill={'#fff'} fontSize={29} />
        </button>
      ) : (
        <button
          onClick={() => {
            navigate('/profile')
          }}
        >
          <SlUser fill='#fff' fontSize={25} />
        </button>
      )}
      {isAuth && <Burger />}
    </header>
  )
}

export default Header
