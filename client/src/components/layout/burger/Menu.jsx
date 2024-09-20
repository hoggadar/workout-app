import cn from 'clsx'
import { menu } from './menu.data.js'
import styles from './Burger.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.js'
import Cookies from 'js-cookie'
import { TOKEN } from '../../../app.constants.js'

function Menu({ isShow, setIsShow }) {
  const { isAuth, setIsAuth } = useAuth()
  const navigate = useNavigate()
  const logoutHandler = () => {
    if (isAuth) {
      Cookies.remove(TOKEN)
      setIsAuth(false)
      setIsShow(false)
      navigate('/auth')
    }
  }
  return (
    <nav
      className={cn(styles.menu, {
        [styles.show]: isShow
      })}
    >
      <ul>
        {menu.map((item, index) => (
          <li key={`_menu_${index}`}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
