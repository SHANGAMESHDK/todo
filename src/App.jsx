import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Abc from'./todo'

import {Routes, Route, useLocation} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'


function App() {
  const location = useLocation()
  const inLogged = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")

  return (
    <>
      {
        inLogged ?
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            
        </Routes>

        :

        
          <Routes>
            <Route element={<ProtectedRoute/>}> 
                
                <Route path="/todo" element={<Abc/>}/>
            </Route>
          </Routes>

        }

      
    </>
  )
}

export default App
