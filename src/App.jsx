
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import ViewMoreDetails from './Components/Pages/ViewMoreDetails/ViewMoreDetails'
// import LandingPage from './Components/Pages/LandingPage/LandingPage'
// import SwipeableNewsCard from './Components/Utilities/SwipeCard'
import NewsPage from './Components/Pages/LandingPage/LandingPage'
import Header from './Components/Utilities/Header'
import Footer from './Components/Utilities/Footer'
// import UserDetails from './Components/Pages/ViewMoreDetails/UserDetails'
// import CarDetails from './Components/Pages/ViewMoreDetails/UserDetails'
// import { trackVisitor } from './Components/Utilities/Telegrammessage';
// import { useEffect } from 'react';

function App() {
// import { trackVisitor } from './utils/telegram';

// useEffect(() => {
//   trackVisitor();
// }, []);


  return (
     <BrowserRouter>
       <Header/>
       <div className="bg-[#03264d] text-white py-6 text-center">
         <h1 className="text-3xl font-bold uppercase">Top Headlines</h1>
         <p className="text-sm mt-1">From Terrabyte Media</p>
       </div>
      <Routes>
      
        <Route path="/" element={<NewsPage />} />
        {/* <Route path="/car/:id" element={<CarDetails />}  */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
