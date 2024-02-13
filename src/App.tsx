import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import About from './pages/About/AboutPage';
import Login from './components/Login/Login';
import CarsPage from './pages/CarsPage/CarsPage';
import CarDetails from './pages/CarDetails/CarDetails';
import { AuthProvider } from './contexts/AuthContext';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';


function App(): ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>/profile
          <Route path='/' element={<Homepage />} />
          <Route path='/cars' element={<CarsPage />} />
          <Route path='/About' element={<About />} />
          <Route path='/car/:id' element={<CarDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path="/contact" element={<Contact />}/>
          
          
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
