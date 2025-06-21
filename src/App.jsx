
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import ViewMoreDetails from './Components/Pages/ViewMoreDetails/ViewMoreDetails'
import LandingPage from './Components/Pages/LandingPage/LandingPage'
// import UserDetails from './Components/Pages/ViewMoreDetails/UserDetails'
import CarDetails from './Components/Pages/ViewMoreDetails/UserDetails'

function App() {


  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/car/:id" element={<CarDetails />} /> {/* <-- FIXED HERE */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
