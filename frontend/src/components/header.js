import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetUserDetailsQuery, endpoints } from '../services/authService.js'
import { logout, setCredentials } from '../store/slices/authSlice.js'
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
    dispatch(endpoints.logoutUser.initiate(), { track: false})
    navigate('/login')
    console.log('after dispatch')
  };

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <header>
      <div className='header-status'>
        <span>
          { userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
        </span>
        <div className='cta'>
          {userInfo ? (
            <button className='button' onClick={() => logout()}>
              Logout
            </button>
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
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
          </>
        }
      </nav>
    </header>
  )
}

export default Header