import styles from './Alert.module.scss'
import cn from 'clsx'

function Alert({ type = 'success', text }) {
  return (
    <>
      <div className={cn(styles.alert, styles[type])}>{text}</div>
    </>
  )
}

export default Alert
