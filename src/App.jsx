import { Route, Routes } from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import NavBar from './components/NavBar'
import { Movieprovider } from './context/MovieContext'

function App() {
  

  return (
    <Movieprovider>
      <NavBar/> 
     <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path ='/favourite' element= {<Favourite/>}/>
      </Routes>
     </main>
    </Movieprovider>
  )
}

export default App
