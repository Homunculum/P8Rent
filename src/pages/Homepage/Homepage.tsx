import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CarService from '../../services/CarService';
import CarCard from '../../components/CarCard/CarCard';
import { CarModel } from '../../models/responses/CarModel';
import './Homepage.css'
import { AuthContext } from '../../contexts/AuthContext';


const HomePage: React.FC = () => {
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [filterEndDate, setFilterEndDate] = useState(new Date());
  const [cars, setCars] = useState<CarModel[]>([]);
  const history = useNavigate();
  
  const { setFilterDates } = useContext(AuthContext); // setFilterDates'i AuthContext'ten alın

  const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  useEffect(() => {
    setFilterEndDate(addDays(filterStartDate, 1));
  }, [filterStartDate]);

  const handleStartDateChange = (date: Date) => {
    setFilterStartDate(date);
    setFilterEndDate(addDays(date, 1));
  };
  
  const handleFilter = async () => {
    try {
      const response = await new CarService().getAll();
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
    
    const startDateString = filterStartDate.toISOString().split('T')[0];
    const endDateString = filterEndDate.toISOString().split('T')[0];
    
    setFilterDates(startDateString, endDateString); // Tarihleri AuthContext'e kaydedin
    
    history('/cars');
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await new CarService().getAll();
        if (Array.isArray(response.data.data)) {
          setCars(response.data.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
  
    fetchCars();
  }, []);
  

  return (
    <div className="container">
  <h1 className='text-center'>Car Filter</h1>
  <div className='filter-card-container'>
    <div className="card" >
      <div className='date-input-container'>
        <div className='date-input-div'>
          <label>Start Date:</label>
          <DatePicker
            selected={filterStartDate}
            minDate={new Date()}
            dateFormat={'dd/MM/yyyy'}
            onChange={handleStartDateChange}
          />
        </div>
        <div className='date-input-div'>
          <label>End Date:</label>
          <DatePicker
            selected={filterEndDate}
            minDate={addDays(filterStartDate, 1)}
            dateFormat={'dd/MM/yyyy'}
            onChange={(date: Date) => setFilterEndDate(date)}
          />
        </div>
      </div>
      <div className="btn-container"><button onClick={handleFilter}>Filter</button></div>
    </div>
  </div>

  <h1 className='text-center'>All Cars</h1>
  <div className="row">
    {cars.map((car) => (
      <div key={car.id} className="col-md-6 mb-4">
        <CarCard car={car} />
      </div>
    ))}
  </div>
</div>

  );
};

export default HomePage;
