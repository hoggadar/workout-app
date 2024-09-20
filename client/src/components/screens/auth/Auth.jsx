import Layout from '../../layout/Layout.jsx'
import styles from './Auth.module.scss'
import Field from '../../ui/field/Field.jsx'
import Button from '../../ui/button/Button.jsx'
import Loader from '../../ui/loader/Loader.jsx'
import { useAuthPage } from './useAuthPage.js'

function Auth() {
  const { errors, handleSubmit, isLoading, onSubmit, register, setType } =
    useAuthPage()
  return (
    <>
      <Layout heading={'Sign in'} bgImage={'/images/auth-bg.png'} />
      <div className={'wrapper-inner-page'}>
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            error={errors?.email?.message}
            name='email'
            register={register}
            options={{
              required: 'Email is required'
            }}
            type='text'
            placeholder='Enter email'
          />

          <Field
            error={errors?.password?.message}
            name='password'
            register={register}
            options={{
              required: 'Password is required'
            }}
            type='password'
            placeholder='Enter password'
          />

          <div className={styles.wrapperButtons}>
            <Button clickHandler={() => setType('login')}>Sign in</Button>
            <Button clickHandler={() => setType('signup')}>Sign up</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Auth
