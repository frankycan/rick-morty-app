import { useSelector } from 'react-redux'
import '../styles/characters.css'

const Characters = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div>
      <figure>{userInfo?.email.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.email}!</strong> You can view this page because you're logged in
      </span>
    </div>
  )
}

export default Characters