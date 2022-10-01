import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner/Spinner'
import styles from './Auth.module.css'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

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

    const userData = {
      username,
      password,
    }

    dispatch(login(userData))
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
              <p>Sign In</p>
              <p>Enter your credentials to continute</p>
            </div>
            <div className={styles['content__form']}>
              <form onSubmit={onSubmit}>

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
                  <div className={styles['form__buttonWrapper']}>
                    <button type="submit" className={styles['form__button']}>Sign IN</button>
                  </div>
                </div>
              </form>
            </div>
            <div className={styles['content__footer']}>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </div>

        </div>
      </div>
    </section>






    {/* <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start playing nonograms</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section> */}
  </>
}

export default Login