// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HomePage: React.FC = () => {
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [filterEndDate, setFilterEndDate] = useState(new Date());
  const history = useNavigate();

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

  const handleFilter = () => {
    const filteredCarsQuery = `?start=${filterStartDate.toISOString()}&end=${filterEndDate.toISOString()}`;
    history(`/cars${filteredCarsQuery}`);
  };

  return (
    <div className="container">
      <h1>Car Filter</h1>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={filterStartDate}
            minDate={new Date()}
            dateFormat={'dd/MM/yyyy'}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={filterEndDate}
            minDate={addDays(filterStartDate, 1)}
            dateFormat={'dd/MM/yyyy'}
            onChange={(date: Date) => setFilterEndDate(date)}
          />
        </div>
        <button onClick={handleFilter}>Filter</button>
      </div>
    </div>
  );
};

export default HomePage;
