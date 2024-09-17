import cn from 'clsx'
import { menu } from './menu.data.js'
import styles from './Burger.module.scss'
import { Link } from 'react-router-dom'

function Menu({ isShow }) {
  const logoutHandler = () => {}
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
