import Header from './header/Header'
import styles from './Layout.module.scss'
import cn from 'clsx'
import { useToken } from '../../hooks/useToken.js'

function Layout({ children, bgImage, heading = '', backLink }) {
  useToken()
  return (
    <section
      className={cn(styles.wrapper, {
        [styles.otherPage]: !!heading
      })}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header backLink={backLink} />
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      {children && <div>{children}</div>}
    </section>
  )
}

export default Layout
