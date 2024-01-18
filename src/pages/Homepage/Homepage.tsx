import React, { useEffect, useState } from 'react';
import { CarCard } from '../../components';
import { CarsModel } from '../../models/responses/CarsModel';
import CarService from '../../services/CarService';
import './Homepage.css';



const HomePage: React.FC = () => {
  const [filteredCars, setFilteredCars] = useState<CarsModel[]>([]);
  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2024);

  const handleFilter = async () => {
    try {
      const response = await new CarService().getAll();
      const filtered = response.data.filter((car) => car.year >= startYear && car.year <= endYear);
      setFilteredCars(filtered);
    } catch (error) {
      console.error('Error filtering cars:', error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [startYear, endYear]);

  return (<div className="container">
    <div >
  <h1>Filtered Cars</h1>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <div>
      <label>Start Year:</label>
      <input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} />
    </div>
    <div>
      <label>End Year:</label>
      <input type="number" value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} />
    </div>
    <button onClick={handleFilter}>Filter</button>
  </div>
  
  <div className="row" >
    {filteredCars.map((car) => (
      <div key={car.id} className="col-md-3 mb-4">
        <CarCard car={car} />
      </div>
    ))}
  </div>
  </div>
</div>
);
};



export default HomePage;