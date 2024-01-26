import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header.js"
import Login from './pages/login.js'
import Register from "./pages/register.js"
import Characters from "./pages/characters.js"
import NotFound from "./pages/notFound.js"
import Auth from "./middlewares/auth.js"
import './styles/app.css'

function App() {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Header />
      <main className='container content'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Auth />}>
            <Route path="/characters" element={<Characters />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App