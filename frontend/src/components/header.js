import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/authService.js'
import { setCredentials } from '../store/slices/authSlice.js'
import { userLogout } from '../store/slices/authActions.js'
import logo from '../assets/logo.png'
import '../styles/header.css'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // automatically authenticate user if token is found
  const { data } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })
  
  const logout = () => {
    dispatch(userLogout(data))
    navigate('/login')
  };

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <header>
      <div className='header-status'>
        <img className="logo" src={logo} />
        <div className='cta'>
          {userInfo !== null ? (
            <span>
              Hi <strong>{ userInfo.email }</strong>!
              <button className='button' onClick={() => logout()}>
                Logout
              </button>
            </span>
          ) : (
            <NavLink className='button' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className='container navigation'>
        { userInfo !== null
          ? <NavLink to='/characters'>Characters</NavLink>
          :  <>
            <NavLink className="login" to='/login'>Login</NavLink>
            <NavLink className="register" to='/register'>Register</NavLink>
          </>
        }
      </nav>
    </header>
  )
}

export default Header