import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet, NavLink } from 'react-router-dom'
import { useEffect } from 'react'

const Auth = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }
  return <Outlet />

}

export default Auth