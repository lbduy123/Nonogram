import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner/Spinner'

import styles from './Auth.module.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  })

  const { name, email, username, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        username,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className={styles['register']}>
      <div className={styles['container']}>
        <div className={styles['content__left']}>
          <div className={styles['content__leftWrapper']}>
            <div className={styles['content__leftHeader']}>
              <h1>Nonogram</h1>
              <p className={styles['subHeader']}>The Greates Painter</p>
              <p>Master's Legacy - discover all beauty of Nonogram puzzles (multiple game modes, level sizes), master painting skills in Editor and share works with friends in Workshop. Become The Greatest.</p>
            </div>
            <div className={styles['author']}>
              <p>Designed by Minh & Duy</p>
            </div>
          </div>
        </div>
        <div className={styles['content__right']}>
          <div className={styles['content__rightWrapper']}>
            <div className={styles['content__rightHeader']}>
              <p>Sign Up</p>
              <p>Enter your credentials to continute</p>
            </div>
             <div className={styles['content__form']}>
              <form onSubmit={onSubmit}>
                <div className={styles['form__group']}>
                  <input
                    type='text'
                    className={styles['form__control']}
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Enter your name'
                    onChange={onChange}
                  />
                </div>

                <div className={styles['form__group']}>
                  <input
                    type="email"
                    className={styles['form__control']}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </div>

                <div className={styles['form__group']}>
                  <input
                    type="text"
                    className={styles['form__control']}
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={onChange}
                  />
                </div>

                <div className={styles['form__group']}>
                  <input
                    type="password"
                    className={styles['form__control']}
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </div>

                <div className={styles['form__group']}>
                  <input
                    type="password"
                    className={styles['form__control']}
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm password"
                    onChange={onChange}
                  />
                </div>

                <div className={styles['form__group']}>
                  <div className={styles['form__buttonWrapper']}>
                  <button type="submit" className={styles['form__button']}>Sign Up</button>
                  </div>  
                </div>          
              </form>
            </div>
            <div className={styles['content__footer']}>
                <Link to="/login">Already have an account?</Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </>
}

export default Register