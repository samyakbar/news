
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import ViewMoreDetails from './Components/Pages/ViewMoreDetails/ViewMoreDetails'
import LandingPage from './Components/Pages/LandingPage/LandingPage'
import UserDetails from './Components/Pages/ViewMoreDetails/UserDetails'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
      <Route path="/user/:id" element={<UserDetails />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
