import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header.js"
import Login from './pages/login.js'
import Register from "./pages/register.js"
import Characters from "./pages/characters.js"
import Character from "./pages/character.js"
import NotFound from "./pages/notFound.js"
import Auth from "./middlewares/auth.js"
import './styles/app.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='container content'>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/characters" element={<Characters />} />
          </Route>
          <Route element={<Auth />}>
            <Route path="/characters/:characterId" element={<Character />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App