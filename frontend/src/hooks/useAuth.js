import { useSelector } from "react-redux"

function useAuth() {
  const { auth } = useSelector((state) => state);
  return auth;
}

export default useAuth