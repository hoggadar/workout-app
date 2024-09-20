import styles from './Burger.module.scss'
import { CgMenuRight } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import Menu from './Menu.jsx'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside.js'

function Burger() {
  const { isShow, setIsShow, ref } = useOnClickOutside(false)
  return (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={() => setIsShow(!isShow)}>
        {isShow ? <IoClose /> : <CgMenuRight />}
      </button>
      <Menu isShow={isShow} setIsShow={setIsShow} />
    </div>
  )
}

export default Burger
