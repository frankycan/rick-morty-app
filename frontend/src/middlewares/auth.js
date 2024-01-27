import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const Auth = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (!userInfo) {
    navigate('/login')
  } else {
    return <Outlet />
  }

}

export default Auth