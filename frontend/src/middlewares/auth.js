import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const Auth = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // redirect unauthorized users to login screen
  // useEffect(() => {
  //   if (userInfo === null) {
  //     navigate('/login')
  //   }
  // }, [navigate, userInfo])
  // return <Outlet />

  if (!userInfo) {
    navigate('/login')
  } else {
    return <Outlet />
  }

}

export default Auth