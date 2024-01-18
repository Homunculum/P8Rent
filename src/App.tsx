import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import CarsPage from './pages/Carspage/CarsPage';
import About from './pages/About/AboutPage';
import CarDetails from './pages/CarDetails/CarDetails';
import Login from './pages/Login/Login';



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