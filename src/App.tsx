import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/AboutPage';

import Login from './pages/Login/Login';
import CarsPage from './pages/CarsPage/CarsPage';
import CarDetails from './pages/CarDetails/CarDetails';



function App(): ReactElement {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/cars' element={<CarsPage />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/car/:id' element={<CarDetails />}></Route>
        <Route path='/login' element={<Login />}></Route>
        </Routes>
    </BrowserRouter>
	);
}

export default App;