import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.scss'
import Burger from '../burger/Burger.jsx'
import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { SlUser } from 'react-icons/sl'

function Header({ backLink = '/' }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  return (
    <header className={styles.header}>
      {pathname !== '/' ? (
        <button
          onClick={() => {
            navigate(backLink)
          }}
        >
          <IoMdArrowBack fill={'#fff'} fontSize={29} />
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(isAuth ? '/profile' : '/auth')
          }}
        >
          <SlUser fill='#fff' fontSize={25} />
        </button>
      )}
      <Burger />
    </header>
  )
}

export default Header
