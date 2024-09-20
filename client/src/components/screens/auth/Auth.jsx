import Layout from '../../layout/Layout.jsx'
import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form'
import Field from '../../ui/field/Field.jsx'
import Button from '../../ui/button/Button.jsx'
import { useState } from 'react'
import Loader from '../../ui/loader/Loader.jsx'

function Auth() {
  const [type, setType] = useState('login')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <>
      <Layout heading={'Sign in'} bgImage={'/images/auth-bg.png'} />
      <div className={'wrapper-inner-page'}>
        {false && <Loader />}
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
            <Button clickHandler={() => setType('register')}>Sign up</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Auth
