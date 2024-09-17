import cn from 'clsx'
import styles from './Button.module.scss'

function Button({ children, clickHandler, size = 'x1' }) {
  return (
    <div className={styles.wrapper}>
      <button
        className={cn(styles.button, styles[size])}
        onClick={clickHandler}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
